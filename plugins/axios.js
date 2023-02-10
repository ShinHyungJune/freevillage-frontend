export default function (context) {
    context.$axios.onError((error) => {
        if (error.response.status === 401) {
            context.$auth.logout();

            location.href = "/auth/login";
        }
    })
}
