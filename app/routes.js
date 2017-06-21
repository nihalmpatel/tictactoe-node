module.exports = function(app){

    app.get('/',function(req,res){
        res.render('index.ejs');
    });

    app.post('/',function(req,res){
        res.send(req.body.roomname);
    });

    app.get('/gameplay',function(req,res){
        res.render('playboard.ejs');
    });
}