'use strict';

/* ============================================================
   calendar.js — Multi-language calendar widget
   English + Hijri (Islamic Umm al-Qura) + Bangla (Bengali)
   ============================================================ */

(function () {

  /* ---------- Bangla digit converter ---------- */
  const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  function toBnDigits(num) {
    return String(num).split('').map(d => BN_DIGITS[d] ?? d).join('');
  }

  /* ---------- English Date ---------- */
  function getEnglishDate() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return {
      day: now.getDate(),
      dayName: dayNames[now.getDay()],
      month: monthNames[now.getMonth()],
      year: now.getFullYear()
    };
  }

  /* ---------- Hijri Date (Intl API) ---------- */
  function getHijriDate() {
    try {
      const now = new Date();
      // Arabic numerals with Umm al-Qura calendar
      const fmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return fmt.format(now);
    } catch (err) {
      return '';
    }
  }

  /* ---------- Bangla (Bengali) Date ----------
     Bangladeshi Bengali calendar reform (2019):
     Boishakh 1 = April 14 (Gregorian, fixed).
     First 6 months are 31 days, next 5 are 30 days, Falgun = 29 (30 in leap year).
     ------------------------------------------- */
  const BN_MONTHS = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
                     'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];

  function isGregorianLeap(y) {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  }

  function getBanglaDate() {
    const now = new Date();
    const gYear = now.getFullYear();
    const gMonth = now.getMonth(); // 0-indexed
    const gDate = now.getDate();

    // Reference: Boishakh 1 = April 14
    const boishakhStart = new Date(gYear, 3, 14); // April = 3
    let bnYear;
    let dayOfBnYear; // 1-indexed

    if (now >= boishakhStart) {
      bnYear = gYear - 593;
      dayOfBnYear = Math.floor((now - boishakhStart) / 86400000) + 1;
    } else {
      // Before April 14 → previous BN year
      const prevBoishakh = new Date(gYear - 1, 3, 14);
      bnYear = gYear - 594;
      dayOfBnYear = Math.floor((now - prevBoishakh) / 86400000) + 1;
    }

    // BN month lengths (post-2019 reform)
    // Falgun: 29 normally, 30 if NEXT Gregorian year is leap (since Falgun spans Feb–Mar)
    const falgunDays = isGregorianLeap(bnYear + 594) ? 30 : 29;
    const monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, falgunDays, 30];

    let monthIdx = 0;
    let dayOfMonth = dayOfBnYear;
    for (let i = 0; i < 12; i++) {
      if (dayOfMonth <= monthLengths[i]) {
        monthIdx = i;
        break;
      }
      dayOfMonth -= monthLengths[i];
    }

    return {
      day: toBnDigits(dayOfMonth),
      month: BN_MONTHS[monthIdx],
      year: toBnDigits(bnYear)
    };
  }

  /* ---------- Render ---------- */
  function renderCalendar() {
    const eng = getEnglishDate();
    const hijri = getHijriDate();
    const bn = getBanglaDate();

    // Desktop widget
    const $day = document.getElementById('calDay');
    const $dayName = document.getElementById('calDayName');
    const $monthYear = document.getElementById('calMonthYear');
    const $hijri = document.getElementById('calHijri');
    const $bangla = document.getElementById('calBangla');

    if ($day) $day.textContent = eng.day;
    if ($dayName) $dayName.textContent = eng.dayName;
    if ($monthYear) $monthYear.textContent = `${eng.month} ${eng.year}`;
    if ($hijri) $hijri.textContent = hijri;
    if ($bangla) $bangla.textContent = `${bn.day} ${bn.month} ${bn.year}`;

    // Mobile widget
    const $mobDay = document.getElementById('mobCalDay');
    const $mobRest = document.getElementById('mobCalRest');
    if ($mobDay) $mobDay.textContent = eng.day;
    if ($mobRest) $mobRest.textContent = `${eng.dayName}, ${eng.month} ${eng.year}`;
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderCalendar();
    // Update every 60s — covers day rollovers
    setInterval(renderCalendar, 60 * 1000);
  });

  // Expose for testing / external use
  window.TMCalendar = {
    getEnglishDate,
    getHijriDate,
    getBanglaDate,
    renderCalendar
  };

})();
