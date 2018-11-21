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
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }
})
