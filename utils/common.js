export default {
  data() {
    return {
      activeSidebar: false,
      active: false,
      blob: null,
    }
  },
  methods: {
    handleBackdropClick(e, className) {
      // console.log(e.srcElement._prevClass,33223)
      if (e.srcElement._prevClass === className) {
        this.activeSidebar = false;
        this.active = false;
        this.$emit('cancel');
      }
    },
    validateDate(dateString) {
      // Check if the input is a number with 6 digits
      if (!/^\d{6}$/.test(dateString)) {
        return false;
      }

      // Extract the year, month, and day from the input
      const year = parseInt(dateString.substr(0, 2));
      const month = parseInt(dateString.substr(2, 2));
      const day = parseInt(dateString.substr(4, 2));

      // Check if the year is a valid 2-digit year (between 00 and 99)
      if (year < 0 || year > 99) {
        return false;
      }

      // Check if the month is a valid number (between 01 and 12)
      if (month < 1 || month > 12) {
        return false;
      }

      // Check if the day is a valid number for the given month and year
      const twenieMaxDay = new Date(year + 1900, month, 0).getDate();
      const twenieOneMaxDay = new Date(year + 2000, month, 0).getDate();
      if (day < 1 || (day > twenieMaxDay || day > twenieOneMaxDay)) {
        return false;
      }

      return true;
    },
    validatePhone(phoneNumber) {
      return /^010\d{8}$/.test(phoneNumber)
    }
  },
}