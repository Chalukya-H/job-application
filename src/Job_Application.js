import React from 'react'
import axios from 'axios'


class JobForm extends React.Component {
    constructor(){
        super()
        this.state = {
            username :'',
            email :'',
            phno:'',
            role:'',
            experience:'',
            skills :'',
            optionSelect : true
        }
    }

    handleTextChange = (e) =>{
           this.setState ({[e.target.name] : e.target.value}) 
    }

    handleSubmit = (e) =>{
        e.preventDefault()

        const formdata = {
            name : this.state.username,
            email : this.state.email,
            phone : this.state.phno,
            skills: this.state.skills,
            jobTitle: this.state.role,
            experience:this.state.experience
        }

        console.log(formdata)
        axios.post('http://dct-application-form.herokuapp.com/users/application-form',formdata)
        .then(response =>{
            if(response.status === 200) {
                alert('Application Submitted sucessfully')
                this.setState({
                    username :'',
                    email :'',
                    phno:'',
                    role:'',
                    experience:'',
                    skills :''
                })
            } else {
                alert('Application not Submitted.')
            }
         
        }) 
        .catch(err=>{
            console.log(err)
        })
 
    }

    render(){     
        return(
            <div className = 'JobSection'>
                <h2> Apply for Job </h2>
                <form className ='JobForm' onSubmit ={this.handleSubmit}>
                    <label htmlFor = 'username'>Full Name</label>
                    <input type ='text' name ='username' id = 'username' value = {this.state.username} onChange = {this.handleTextChange} />
                    <br/><br/>
                    <hr/>
                    <label htmlFor = 'email'>Email Address</label>
                    <input type ='text' name ='email' id = 'email' value = {this.state.email} onChange = {this.handleTextChange} placeholder = 'example@email.com' />
                    <br/><br/>
                    <hr/>
                    <label htmlFor = 'phno'>Contact Number</label>
                    <input type ='text' name ='phno' id = 'phno' value = {this.state.phno} onChange = {this.handleTextChange} placeholder = '+91 9876543298'/>
                    <br/><br/>
                    <hr/>
                    <label htmlFor = 'role'>Apply for Job</label>
                    <select name ='role' id ='role' onChange = {this.handleTextChange}>
                        <option > -- Select -- </option>
                        <option>Front-End Developer</option>
                        <option>Node.js Developer</option>
                        <option>MEAN Stack Developer</option>
                        <option>FULL Stack Developer</option>
                    </select>
                    <br/><br/>
                    <hr/>
                    <label htmlFor = 'experience'>Experience</label>
                    <input type ='text' name ='experience' id = 'experience' value = {this.state.experience} onChange = {this.handleTextChange} placeholder = '2 years , 3 months'/>
                    <br/><br/>
                    <hr/>
                    <label htmlFor = 'skills'>Technical Skills</label>
                    <textarea id = 'skills'  name = 'skills' value = {this.state.skills} onChange = {this.handleTextChange} />
                    <br/> <br/>
                    <hr/>
                    <button className='submit'> Submit Application</button>
                    <br/><br/>


                </form>
            </div>
        )
    }
}

export default JobForm