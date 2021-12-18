const mixins = {
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        formatdate(value) {
            let monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            let date = new Date(value);
            let year = date.getFullYear();
            let month = date.getMonth();
            let dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            return dt + ' ' + monthNames[month] + ' ' + year
        }
    }
}
export default mixins