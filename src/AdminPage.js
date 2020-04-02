import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'


class AdminPage extends React.Component {
    constructor(){
        super()
        this.state = {
            jobdetails:[]
        }

    }

    handleSubmit = (e) =>{
        const name = e.target.name
         
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then(response =>{
             
            var today = new Date();
            var dd = today.getDate()
            var mm = today.getMonth()+1
            var yyyy = today.getFullYear()
            if(dd<10) 
            {
                dd='0'+dd
            } 

            if(mm<10) 
            {
                mm='0'+mm
            } 
            const date = `${yyyy}-${mm}-${dd}`
            

            const data = response.data.filter(jobdata => {
                if(jobdata.createdAt.includes(date) && jobdata.jobTitle === name ){
                    return jobdata
                }
            })

            this.setState({jobdetails:data})
        })

        .catch(err=>{
            console.log(err)
        })

    }

    handleView = (id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then(response =>{
            const Jobdata = response.data
            alert(`Phone No - ${Jobdata.phone}\nEmail - ${Jobdata.email}\nSkills - ${Jobdata.skills} \nExperience - ${Jobdata.experience}\nRole - ${Jobdata.jobTitle} \nStatus - ${Jobdata.status}`)
        })

        .catch(err =>{
            console.log(err)
        })
        
    }


    handleJobStatus =(e,id) =>{
        const value = e.target.name
        if(value === 'shortlist'){
            const status = {"status": "Shortlisted" }
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
            .then(response =>{
                console.log(response)
            })

            .catch(err =>{
                console.log(err)
            })

        }
        else if(value === 'reject'){
            console.log(value)
            const status = {"status": "rejected" }
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
            .then(response =>{
                console.log(response)
            })

            .catch(err =>{
                console.log(err)
            })

        }
    }

    render(){
        return(
            <div>
                <h2> Admin Dashboard</h2>
                <button name = 'Front-End Developer' onClick = {this.handleSubmit}  >Front-End Developer</button>
                <button name ='Node.js Developer' onClick = {this.handleSubmit}>Node.js Developer </button>
                <button name ='MEAN Stack Developer' onClick = {this.handleSubmit}>MEAN Stack Developer</button>
                <button name = 'FULL Stack Developer' onClick = {this.handleSubmit}>FULL Stack Developer</button>
                    <br/><br/>
                <table border = '1'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jobdetails.map( (data) =>{
                                  
                                if(data.name){
                                    return (
                                        <tr key ={data._id}>
                                            <td> {data.name} </td>
                                            <td>{data.skills}</td>
                                            <td>{data.experience}</td>
                                            <td>{data.createdAt}</td>
                                            <td> <button onClick = { () => {
                                                        this.handleView(data._id)  }} >View Details</button></td>
                                            <td>
                                                <button name ='shortlist' onClick = { (e) => {
                                                        this.handleJobStatus(e,data._id)  }}>ShortList</button> 
                                                <button name = 'reject' onClick = { (e) => {
                                                        this.handleJobStatus(e,data._id)  }}>Reject</button>
                                            </td>
                                        </tr>
                                    )
                             } 
                            })
                        }
                    </tbody>
                </table>



            </div>
        )
    }
}

export default AdminPage