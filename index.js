const api_host='http://nlp_demo_api.xiaoquankong.ai'

var vm = new Vue({
    el: '#app',
    data: {
        debug: false,
        tokenizer_list: {},
        message: "王小明在北京的清华大学读书。",
        tokenizer_class: '',
        token_list: {}
    },
    created: function () {},
    method: {
        send_tokenize_request: function () {
            vm.axios.get(api_host + '/single_tokenizer', {
                'message': vm.message,
                'tokenizer_class': vm.tokenizer_class
            })
                .then(function (response) {
                    console.log(response.data);
                    vm.token_list = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }
})

// Optionally the request above could also be done as

vm.axios.get(api_host + '/list_tokenizer')
    .then(function (response) {
        console.log(response.data);
        vm.tokenizer_list = response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
    .then(function () {
        // always executed
    });

var send_tokenize_request = function () {
    vm.axios.get(api_host + '/single_tokenizer', {
        params: {
            'message': vm.message,
            'tokenizer_class': vm.tokenizer_class
        }
    })
        .then(function (response) {
            console.log(response.data);
            vm.token_list = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}