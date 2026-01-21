function doGet(e) {
  const callback = e.parameter.callback;
  const email = (e.parameter.email || '').toString().trim().toLowerCase();
  const action = (e.parameter.action || '').toString().toLowerCase();
  const litid = (e.parameter.litid || '').toString().trim();

  const ss = SpreadsheetApp.getActive();
  const resp = { success: true };

  /* ================= CHECK REFERRAL STATUS ================= */
  if (action === 'checkreferralstatus') {
    if (!litid) {
      return _jsonResponse({ success: false, error: 'missing_litid' }, callback);
    }

    const usersSheet = ss.getSheetByName('Users');
    if (!usersSheet) {
      return _jsonResponse({ hasSubmittedReferral: false }, callback);
    }

    const users = _sheetToObjects(usersSheet);
    const user = users.find(u => (u.litid || '').toString().trim() === litid);

    if (!user) {
      return _jsonResponse({ hasSubmittedReferral: false }, callback);
    }

    // Check if user has a referrer_litid (meaning they've submitted a referral)
    const hasSubmitted = (user.referrerlitid || '').toString().trim().length > 0;
    return _jsonResponse({ hasSubmittedReferral: hasSubmitted }, callback);
  }

  /* ================= GET LEADERBOARD ================= */
  if (action === 'getleaderboard') {
    const usersSheet = ss.getSheetByName('Users');
    if (!usersSheet) {
      return _jsonResponse({ leaderboard: [] }, callback);
    }

    const users = _sheetToObjects(usersSheet);
    const leaderboard = users
      .filter(u => (u.bonus || 0) > 0)
      .map(u => ({
        name: u.name || 'Anonymous',
        litid: u.litid || '',
        bonuspoints: u.bonus || 0
      }))
      .sort((a, b) => b.bonuspoints - a.bonuspoints)
      .slice(0, 10); // Limit to top 10

    return _jsonResponse({ leaderboard: leaderboard }, callback);
  }

  /* ================= USER LOOKUP ================= */
  const usersSheet = ss.getSheetByName('Users');
  if (usersSheet) {
    const users = _sheetToObjects(usersSheet);
    const user = users.find(
      u => (u.email || '').toString().trim().toLowerCase() === email
    );
    if (user) resp.user = user;
  }

  /* ================= REGISTRATIONS ================= */
  const registrations = [];
  const userLit =
    resp.user && resp.user.litid
      ? resp.user.litid.toString().trim()
      : null;

  if (userLit) {
    ss.getSheets().forEach(sheet => {
      const sheetName = sheet.getName();
      if (sheetName === 'Users') return;

      const rows = sheet.getDataRange().getValues();
      if (!rows || rows.length < 2) return;

      // Normalize headers (unchanged logic)
      const headers = rows[0].map(h =>
        h.toString().replace(/\s+/g, '').toUpperCase()
      );

      let litidIndex = headers.indexOf('LITID');
      let tsIndex =
        headers.indexOf('TIMESTAMP') !== -1
          ? headers.indexOf('TIMESTAMP')
          : headers.indexOf('TIME');

      // 🔐 SAFE FALLBACK (NO LOGIC REMOVED)
      // Matches your real sheet format: [Timestamp | LitID]
      if (litidIndex === -1) litidIndex = 1;
      if (tsIndex === -1) tsIndex = 0;

      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const rowLit = (row[litidIndex] || '').toString().trim();

        if (rowLit === userLit) {
          registrations.push({
            event: sheetName,
            litid: rowLit,
            timestamp: (row[tsIndex] || '').toString()
          });
        }
      }
    });
  }

  resp.registrations = registrations;

  return _jsonResponse(resp, callback);
}

function doPost(e) {
  const params = e.parameter || {};
  const action = (params.action || '').toString().toLowerCase();
  const ss = SpreadsheetApp.getActive();

  try {
    if (action === 'signup') {
      const email = (params.email || '').toString().trim().toLowerCase();
      if (!email) return _jsonResponse({ success: false, error: 'missing_email' }, params.callback);

      const name = params.name || '';
      const college = params.college || '';
      const department = params.department || '';
      const phone = params.phone || '';

      let usersSheet = ss.getSheetByName('Users');
      if (!usersSheet) {
        usersSheet = ss.insertSheet('Users');
        usersSheet.getRange(1,1,1,8).setValues([['LitID','Email','Name','College','Department','Phone','Bonus','ReferrerLitID']]);
      }

      const users = _sheetToObjects(usersSheet);
      const existing = users.find(u => (u.email||'').toString().trim().toLowerCase() === email);
      if (existing) {
        return _jsonResponse({ success: true, user: existing });
      }

      // generate a unique LITID
      let litid;
      do {
        litid = _generateLITID();
      } while (users.some(u => (u.litid||'').toString() === litid));

      const now = new Date();
      usersSheet.appendRow([litid, email, name, college, department, phone, 0, '']);

      const userObj = { litid: litid, email: email, name: name, college: college, department: department, phone: phone, bonus: 0 };
      return _jsonResponse({ success: true, user: userObj });
    }

    if (action === 'register') {
      const eventName = params.event || 'Event';
      const name = params.name || '';
      const college = params.college || '';
      const department = params.department || '';
      const email = (params.email || '').toString().trim().toLowerCase();
      const phone = params.phone || '';

      if (!email) return _jsonResponse({ success: false, error: 'missing_email' }, params.callback);

      // Ensure Users sheet and find or create user
      let usersSheet = ss.getSheetByName('Users');
      if (!usersSheet) {
        usersSheet = ss.insertSheet('Users');
        usersSheet.getRange(1,1,1,8).setValues([['LitID','Email','Name','College','Department','Phone','Bonus','ReferrerLitID']]);
      }

      const users = _sheetToObjects(usersSheet);
      let user = users.find(u => (u.email||'').toString().trim().toLowerCase() === email);
      if (!user) {
        // create user automatically using supplied fields
        let litid;
        do { litid = _generateLITID(); } while (users.some(u => (u.litid||'').toString() === litid));
        const now = new Date();
        usersSheet.appendRow([litid, email, name, college, department, phone, 0, '']);
        user = { litid: litid, email: email, name: name, college: college, department: department, phone: phone, bonus: 0 };
      }

      // Find or create event sheet
      let eventSheet = ss.getSheetByName(eventName);
      if (!eventSheet) {
        eventSheet = ss.insertSheet(eventName);
        eventSheet.getRange(1,1,1,2).setValues([['Timestamp','LitID']]);
      }

      // Check if already registered (by litid)
      const rows = eventSheet.getDataRange().getValues();
      for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const rowLit = (row[1] || '').toString().trim();
        if (rowLit === user.litid) {
          return _jsonResponse({ success: true, already: true, litid: user.litid });
        }
      }

      // Append registration: only timestamp and litid per event tab
      const now = new Date();
      eventSheet.appendRow([now, user.litid]);

      return _jsonResponse({ success: true, litid: user.litid });
    }

    if (action === 'submitreferral') {
      const referrerEmail = (params.referrerEmail || '').toString().trim().toLowerCase();
      const referrerLitID = (params.referrerLitID || '').toString().trim();
      const referredLitID = (params.referredLitID || '').toString().trim();

      if (!referrerEmail || !referrerLitID || !referredLitID) {
        return _jsonResponse({ success: false, message: 'Missing fields' }, params.callback);
      }

      // ❌ SELF-REFERRAL BLOCK (HARD)
      if (referrerLitID === referredLitID) {
        return _jsonResponse({
          success: false,
          message: 'You cannot use your own LitID as a referral'
        }, params.callback);
      }

      const usersSheet = ss.getSheetByName('Users');
      const users = _sheetToObjects(usersSheet);

      const referrer = users.find(
        u => (u.email || '').toLowerCase() === referrerEmail
      );

      if (!referrer) {
        return _jsonResponse({ success: false, message: 'Referrer not found' }, params.callback);
      }

          // ❌ PERMANENT BLOCK — ALREADY SUBMITTED
          if ((referrer.referrerlitid || '').toString().trim() !== '') {
            return _jsonResponse({
              success: false,
              message: 'Referral already submitted. This action is allowed only once.'
        }, params.callback);
      }

      const referred = users.find(
        u => (u.litid || '').toString().trim() === referredLitID
      );

      if (!referred) {
        return _jsonResponse({ success: false, message: 'Referred LitID not found' }, params.callback);
      }

      const values = usersSheet.getDataRange().getValues();
      const headers = values[0].map(h => h.toString().toLowerCase());

      const litidCol = headers.indexOf('litid');
      const bonusCol = headers.indexOf('bonus');
      const referrerCol = headers.indexOf('referrerlitid');

      // ✅ Add bonus to referred user
      for (let r = 1; r < values.length; r++) {
        if (values[r][litidCol] === referredLitID) {
          usersSheet.getRange(r + 1, bonusCol + 1)
            .setValue((values[r][bonusCol] || 0) + 1);
          break;
        }
      }

      // ✅ Mark referrer as USED (PERMANENT LOCK)
      for (let r = 1; r < values.length; r++) {
          if (values[r][litidCol] === referrerLitID) {
            usersSheet.getRange(r + 1, referrerCol + 1)
              .setValue(referredLitID);
            break;
          }
        }
      
        return _jsonResponse({
        success: true,
        updatedBonus: (values[r][bonusCol] || 0) + 1
      });

      }


    return _jsonResponse({ success: false, error: 'unknown_action' }, params.callback);
  } catch (err) {
    return _jsonResponse({ success: false, error: String(err) }, e.parameter && e.parameter.callback);
  }
}

// Helpers
function _generateLITID() {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const segment = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LIT26-${segment}-${rand}`;
}

function _sheetToObjects(sheet) {
  const values = sheet.getDataRange().getValues();
  if (!values || values.length < 1) return [];
  const headers = values[0].map(h => (h || '').toString());
  const arr = [];
  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      const key = (headers[c] || ('col' + c)).toString().trim();
      const cleanKey = key.toString().toLowerCase().replace(/[^a-z0-9]+/g, '_');
      obj[cleanKey] = row[c];
    }
    arr.push(obj);
  }
  return arr;
}

function _jsonResponse(obj, callback) {
  const json = JSON.stringify(obj);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
