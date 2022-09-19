var express = require('express');
var app = express();
var PORT = 3000;
var sNome = "nomeUsuario";
var sSenha = "senhaUsuario";
const bodyParser = require('body-parser')
//-- para usar body-parser
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//-- para usar body-parser


app.get('/', function (req, res) {
    //console.log(req.body.nome); 
    return res.sendFile(__dirname + '/login.html')

});
app.post('/logado', function (req, res) {
    //console.log(req.body.nome); 
    // console.log(req.body.senha); 
    if (sNome == req.body.nome && sSenha == req.body.senha) {
        console.log("acesso permitido");
        res.cookie(sSenha,sSenha);
        res.cookie("nUser", req.body.nome);
        
  
        
        
        


        //res.send(`<script>var nome ="${req.body.nome}"; alert(nome)</script>`)
        return res.sendFile(__dirname + '/logado.html')

    } else {
        console.log("acesso negado");
        return res.send("acesso negado")
    }


});

app.get('/restrito', function (req, res) {
    //-----------------------
    function obterCookie(buscarCookie) {
        try {
            //para obter cookies do usario 
            var cookies = req.headers.cookie;
            cookies = cookies.split(";"); //tranforma em um array a string
            console.log(cookies);
            //para obter cookies do usario
            //para buscar um determinado cookie
            for (let i = 0; i < cookies.length; i++) {
                if (cookies[i].indexOf(buscarCookie) > -1) {
                    //console.log("achou");
                    buscarCookie = cookies[i];
                    buscarCookie = buscarCookie.split("=", 1);//vai retornar apenas o primeiro valor
                    buscarCookie = buscarCookie.toString();
                    console.log(buscarCookie);
                    return buscarCookie


                }

            }
        } //end try
        catch (err) {
            return "negado"
       }
        //para buscar um determinado cookie   
    }//end obterCookie()
    //------------

    //consulta os cookies do usuario para achar o "senhaUsuario"
    var cookieBuscado = obterCookie("senhaUsuario");
    if (cookieBuscado == undefined) {
        cookieBuscado = "erro"
    }
    console.log(cookieBuscado + " ")
    //consulta os cookies do usuario para achar o "senhaUsuario"

    if (cookieBuscado.indexOf("senhaUsuario") > -1) {
        console.log("acesso foi permitido ")
        return res.send("acesso foi permitido ")

    } else {

        console.log("acesso foi negado ")
        return res.send("acesso foi negado ")
    }

});






app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});