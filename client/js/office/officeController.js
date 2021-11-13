const url2 = "http://localhost:4000"
//el orden es importante
const getOfficeById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: url2 + "/offices/" + id
    }).done(res => res);
}

const getInfoOffice = async id =>{//details
    let office = await getOfficeById(id);
    document.getElementById('office_code_info').value = office.office[0].office_code;
    document.getElementById('addressOffice_info').value = office.office[0].address;
}

const getInfoUpdateOffice = async id =>{
    let office = await getOfficeById(id);
    document.getElementById("id_update_employee").value = id;
    document.getElementById('office_code_update').value = office.office[0].office_code;
    document.getElementById('addressOffice_update').value = office.office[0].address;
}

const getIdDeleteOffice = async id =>{
    let office = await getOfficeById(id);
    document.getElementById("id_delete_office").value = id;
}

const getOffices = async () => {
    await $.ajax({
        type: 'GET',
        url: url2 + '/offices'
    }).done(function (res) {
        let offices = res.listOffice;
        let content = "";
        $('#tableOffice > tbody').empty();
        if(res.listOffice.length>0){
            for (let i = 0; i < offices.length; i++) {
                content += `
                <tr>
                <th scope='row'>${i + 1}</th>
                <td>${offices[i].office_code}</td>
                <td>${offices[i].address}</td>
                <td>
                <button type='button' onclick="getInfoOffice(${offices[i].id});" class='btn btn-outline-info' data-bs-toggle='modal' data-bs-target='#detailsOffice' title="Detalles"><i class="fas fa-search"></i></button>
                <button type='button' onclick="getInfoUpdateOffice(${offices[i].id});" class='btn btn-outline-primary' data-bs-toggle='modal' data-bs-target='#updateOffice' title="Editar"><i class="far fa-edit"></i></button>
                <button type='button' onclick="getIdDeleteOffice(${offices[i].id});" class='btn btn-outline-danger' data-bs-toggle='modal' data-bs-target='#deleteOffice' title="Deshabilitar"><i class="far fa-trash-alt"></i></button>
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
        $("#tableOffice > tbody").html(content);
    });
}

const createOffice = () => {
    let office_code = document.getElementById('office_code_register').value;
    let address = document.getElementById('addressOffice_register').value;

    $.ajax({
        type: 'POST',
        url: url2 + '/offices/create',
        data: {office_code, address}
    }).done(function (res) {
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgRegisterOffice").html(content);
    })
}

const updateOffice = async ()=>{
    let id = document.getElementById("id_update_employee").value;
    let office_code = document.getElementById('office_code_update').value;
    let address = document.getElementById('addressOffice_update').value;

    $.ajax({
        type:"POST",
        url: url2 + "/offices/update/" + id,
        data: {office_code, address}
    }).done(function(res){
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgUpdateOffice").html(content);
    })
}

const deleteOffice = async () => {
    let id = document.getElementById("id_delete_office").value;
    await $.ajax({
        type: 'POST',
        url: url2 + '/offices/delete/' + id
    }).done(res =>{
        let content = "";
        content += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${res.message}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        $("#msgDeleteOffice").html(content);
    })
      
}
