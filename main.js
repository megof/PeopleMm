
const { createApp } = Vue;

createApp({
    data() {
        return {
            Users: [],
            Gender: 'female',
            Amount: 5,
            Log: false,
            Url: 'https://countryflagsapi.com/png/',
            User: '',
            Userl: [],
            Password: '',
            Message:'',
        }
    },
    methods: {
        async Results() {
            await fetch('https://randomuser.me/api/?results=' + this.Amount)
                .then((response) => response.json())
                .then((data) => this.Users = data.results)
                localStorage.setItem('data',JSON.stringify(this.Users))
        },
        Login() {
            //console.log(this.Users);
            let User = '';
            this.Users.map(user => {
                //console.log(user.login.username + "---" + this.User)
                if (user.login.username == this.User) {
                    User = user.login;
                    this.Userl.push(user)
                    //this.User = user
                }
                //console.log(user.login.username==this.User)
            });
            (User!='')?
                (User.password==this.Password)?
                    this.Log=true:  
                    swal(
                        'Error','Ivalid password','error'
                      )
                :
                swal(
                    'Error','Invalid user','error'
                  )//this.Message='Usuario incorrecto'
        },
        Logout(){
            this.Log= false;
            this.User= '';
            this.Password= '';
            this.Userl = [];
        },
        ing(){
            this.Userl.push(JSON.parse(localStorage.getItem('data'))[0]);

            this.Log = true;
        }
    },
    mounted() {
    },
    created() {
        (localStorage.getItem('data') == null) ?
            this.Results() :
            this.Users = JSON.parse(localStorage.getItem('data'))
    },
}).mount("#root");
