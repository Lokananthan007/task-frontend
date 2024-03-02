
function Dashboard (){
    const username = localStorage.getItem('username');

    return(
        <div>
            <h1 style={{textAlign:'center',paddingTop:'20%',fontSize:'50px' }}>Welcome to Dashboard, {username}!</h1>
        </div>
    )
}
export default Dashboard;