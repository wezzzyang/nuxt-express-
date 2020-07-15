
export const actions = {
    registerAxios: function(state,registerData) {
        return this.$axios.post(`user/register`,registerData);
    }
}