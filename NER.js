const api_host='http://howl-MS-7A67:5000'

const displacy = new displaCyENT('', {
    container: '#tokenizer_result',
    defaultText: 'When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.',
    defaultEnts: ['person', 'org', 'date']
});

var vm = new Vue({
    el: '#app',
    data: {
        message: "王小明在北京的清华大学读书。",
        text: '',
        spans: [],
        ents: []
    },
    created: function () {},
    methods: {
        send_tokenize_request: function () {
            // clean up old result
            displacy.container.innerHTML = '';

            // request new one
            vm.axios.get(api_host + '/parse', {
                    params: {
                        'q': vm.message
                    }
                })
                .then(function (response) {
                    console.log(response.data);
                    vm.text = response.data.text;
                    vm.spans = response.data.spans;
                    vm.ents = response.data.ents;

                    displacy.render(vm.text, vm.spans, vm.ents);
                })
                .catch(function (error) {
                    // log and display alert
                    console.log(error);
                    displacy.container.innerHTML = '<div class="alert alert-danger">后端请求失败，请查看 console。</div>'
                })
                .then(function () {
                    // always executed
                });
        }
    }
})
