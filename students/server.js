import express from 'express'
import mysql from 'mysql'

const app = express()
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'course_mysql'
})

app.listen(3000,()=>{
    console.log('server running::3000');
})



app.get('/',(req,res)=>{
    res.send('aarun')
})

app.get('/students',(req,res)=>{
    const sql = "select * from students";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err)
        return res.send(data)
    })
})



app.post('/add',(req,res)=>{
    
    let add = req.body.tamil + req.body.english + req.body.maths + req.body.social + req.body.science
    let result;
    if(req.body.tamil >35 && req.body.english >35 && req.body.maths >35 && req.body.social >35 && req.body.science >35){
        result = 'pass' 
    }else{
        result = 'fail'
    }

    const userdata = [
        req.body.name,
        req.body.tamil,
        req.body.english,
        req.body.maths,
        req.body.social,
        req.body.science,
        add,
        result
    ]

    console.log(userdata)
    const sql = "INSERT INTO `students` (name,english,tamil,maths,social,science) VALUES (?)";
    db.query(sql,[userdata],(err,data)=>{
        if(err) return res.json(err)
        return res.send('added success')
    })
})

app.get('/students/:rollnumber',(req,res)=>{
    const id = parseInt(req.params.rollnumber)    
    const sql = "select * from students where rolenumber=?";
    db.query(sql,[id],(err,data)=>{
        if(err) return res.json(err)
        return res.send(data[0])
    })
})