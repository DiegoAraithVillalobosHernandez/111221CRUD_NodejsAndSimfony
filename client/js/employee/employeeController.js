const url = "http://localhost/111221CRUD_NodejsAndSimfony/symfony/public/index.php"
//el orden es importante
const getEmployeeById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: url + "/employee/" + id
    }).done(res => res);
}

const getInfo = async id =>{//details
    let employee = await getEmployeeById(id);
    document.getElementById('name_info').value = employee.employee[0].name;
    document.getElementById('addressEmployee_info').value = employee.employee[0].address;
    document.getElementById('salary_info').value = employee.employee[0].salary;
    document.getElementById('registered_info').value = employee.employee[0].registered.date;
    document.getElementById('updated_info').value = employee.employee[0].updated.date;
    document.getElementById('status_info').value = employee.employee[0].status ? "Activo":"Inactivo";
    document.getElementById('id_office_info').value = employee.employee[0].id_office;
}

const getInfoUpdate = async id =>{
    let employee = await getEmployeeById(id);
    document.getElementById("id_update_employee").value = id;
    document.getElementById('name_update').value = employee.employee[0].name;
    document.getElementById('addressEmployee_update').value = employee.employee[0].address;
    document.getElementById('salary_update').value = employee.employee[0].salary;
    document.getElementById('id_office_update').value = employee.employee[0].id_office;
}

const getIdDelete = async id =>{
    let employee = await getEmployeeById(id);
    document.getElementById("id_delete_employee").value = id;
}

const getEmployees = async () => {
    await $.ajax({
        type: 'GET',
        url: url + '/employees'
    }).done(function (res) {
        let employees = res.listEmployee;
        let content = "";
        $('#tableEmployee > tbody').empty();
        if(res.listEmployee.length>0){
            for (let i = 0; i < employees.length; i++) {
                content += `
                <tr>
                <th scope='row'>${i + 1}</th>
                <td>${employees[i].name}</td>
                <td>${employees[i].address}</td>
                <td>${employees[i].salary}</td>
                <td>${employees[i].status? 'activo':'inactivo'}</td>
                <td>${employees[i].id_office}</td>
                <td>
                <button type='button' onclick="getInfo(${employees[i].id});" class='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#detailsEmployee' title="Detalles"><i class="fas fa-search"></i></button>
                <button type='button' onclick="getInfoUpdate(${employees[i].id});" class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#updateEmployee' title="Editar"><i class="far fa-edit"></i></button>
                <button type='button' onclick="getIdDelete(${employees[i].id});" class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteEmployee' title="Deshabilitar"><i class="far fa-trash-alt"></i></button>
                </td>
                </tr>
                `;
            }
        }else{
            content += `
            <tr>
            <td colspan=5>No se encontraron valores</td>
            </td>`
        }
        $("#tableEmployee > tbody").html(content);
    });
}

const createEmployee = () => {
    let name = document.getElementById('name_register').value;
    let address = document.getElementById('addressEmployee_register').value;
    let salary = document.getElementById('salary_register').value;
    let id_office = document.getElementById('id_office_register').value;

    $.ajax({
        type: 'POST',
        url: url + '/employee/create',
        data: {name, address, salary, id_office}
    }).done(function (res) {
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgRegisterEmployee").html(content);
    })
}

const updateEmployee = async ()=>{
    let id = document.getElementById("id_update_employee").value;
    let name = document.getElementById('name_update').value;
    let address = document.getElementById('addressEmployee_update').value;
    let salary = document.getElementById('salary_update').value;
    let id_office = document.getElementById('id_office_update').value;

    $.ajax({
        type:"POST",
        url: url + "/employee/update/" + id,
        data: {name, address, salary, id_office}
    }).done(function(res){
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgUpdateEmployee").html(content);
    })
}

const deleteEmployee = async () => {
    let id = document.getElementById("id_delete_employee").value;
    await $.ajax({
        type: 'GET',
        url: url + '/employee/delete/' + id
    }).done(res =>{
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgDeleteEmployee").html(content);
    })
      
}
