var nav = new Vue({
    el: '#nav',
    data: {
        isOpen : false,
        items: [
            {
                url:'#home',
                name: 'Fireballs'
            },
            {
                url: '#about',
                name: 'About'
            },
            // and so on, depending on dropdown features
        ]
    },
    methods: {
        mouseover: function(){
            this.isOpen = true;
        },
        mouseleave: function(){
            this.isOpen = false;
        }
    }
});