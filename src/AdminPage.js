import React from 'react'
import axios from 'axios'
// import {Link} from 'react-router-dom'


class AdminPage extends React.Component {
    constructor(){
        super()
        this.state = {
            jobdetails:[],
            jobTitle : ['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            selected: 'Front-End Developer'
        }

    }

    handleSubmit = (e) =>{
        let selected = ''
        if (e == undefined) {
            selected = this.state.selected
        } else { selected = e.target.name }
         
        // console.log(selected)
         
        this.setState ({selected})
         
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
                if(jobdata.createdAt.includes(date) && jobdata.jobTitle === selected ){
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
        const status = e.target.name        
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,{status})
            .then(response =>{
                console.log(response)
                this.handleSubmit()
            })

            .catch(err =>{
                console.log(err)
            }) 
    }

    componentDidMount = () =>{
        this.handleSubmit()
    }

    render(){
        return(
            <div>
                <h2> Admin Dashboard</h2>
                {
                    this.state.jobTitle.map((title,i) => 
                        <button key= {i} name ={title} onClick = {this.handleSubmit}>{title}</button>
                    )
                }

                <br/> 
                <h2>{this.state.selected}</h2>
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
                                                {
                                                    data.status === 'applied' ? (
                                                     <div>
                                                        <button name ='shortlisted' onClick = { (e) => {
                                                            this.handleJobStatus(e,data._id)  }}>ShortList</button> 
                                                        <button name = 'rejected' onClick = { (e) => {
                                                            this.handleJobStatus(e,data._id)  }}>Reject</button>
                                                    </div>
                                                    ) : 
                                                    <button name = {data.status } disabled> {data.status }</button> 
                                                 
                                                }
                                                
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