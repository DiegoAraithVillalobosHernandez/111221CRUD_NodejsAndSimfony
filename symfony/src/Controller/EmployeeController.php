<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EmployeeController extends AbstractController
{
    /**
     * @Route("/employee", name="employee")
     */
    public function findAllEmployees()
    {
        $em = $this->getDoctrine()->getManager(); //instanciando la bd
        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, e.updated, e.status, e.id_office FROM App:Employee e');
        $listEmployee = $query->getResult();
        
        if (count($listEmployee) > 0) {
            $data = [
                'status' => 200,
                'message' => 'Se encontraron ' . count($listEmployee) . ' resultados.',
                'listEmployee' => $listEmployee
            ];
        }else{
            $data = [
                'status' => 400,
                'message' => 'No se encontraron resultados.'
            ];
        }
        return new JsonResponse($data);
    }
    
    public function employeeById($id)
    {
        $em = $this->getDoctrine()->getManager();
        //$employee = $em ->getRepository('App:Employee') ->findOneBy(['id' => $id]);
        $query = $em->createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered ,e.updated, e.status, e.id_office FROM App:Employee e WHERE e.id = :p');
        $query->setParameter(':p', $id);
        $employee = $query->getResult();

        if (sizeof($employee) > 0) { //quitar if si no funciona
            $data = [
                'status' => 200,
                'message' => 'Se encontro el empleado correctamente.',
                'employee' => $employee
            ];
        } else {
            $data = [
                'status' => 400,
                'message' => 'No se encontro el empleado.',
                'employee' => $employee
            ];
        }
        return new JsonResponse($data);
    }

    public function createEmployee(Request $request)
    {
        $em = $this->getDoctrine()->getManager(); //instanciación de la bd
        $name = $request->get('name', null); //vemos si insertaron datos y sino colocamos null
        $address = $request->get('address', null);
        $salary = $request->get('salary', 0.0);
        $id_office = $request->get('id_office', null);

        $employee = new \App\Entity\Employee(); //Crea una instancia de employee
        $employee->setName($name); //obtenemos valores ingresados en el form y seteamos
        $employee->setAddress($address);
        $employee->setSalary($salary);
        $employee->setIdOffice($id_office);
        $employee->setStatus(1); //se le asigna status ya que no se llena en el formulario
        $employee->setRegistered(new \DateTime());//le asignamos la fecha actual
        $employee->setUpdated(new \DateTime());//se podría haber puesto directo en la bd

        $em->persist($employee); //crea la sentencia de insercion
        $em->flush(); //es como un commit para que se inserte en la bd

        $data = [
            'status' => 200,
            'message' => 'Se ha guardado la escuela correctamente.',
        ];

        return new JsonResponse($data);
    }

    public function deleteEmployee($id)
    {
        $em = $this->getDoctrine()->getManager();
        //hacemos consulta
        $query= $em->createQuery('UPDATE App:Employee e SET e.status = 0 WHERE e.id = :p');
        $query->setParameter(':p',$id);
        $employee = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Se ah deshabilitado correctamente',
            'employee' => $employee
        ];
        return new JsonResponse($data);
    }

    public function updateEmployee(Request $request, $id){//request valores formulario
        $em = $this->getDoctrine()->getManager(); //instanciación de la bd

        $name = $request->get('name', null); //obtencion de valores
        $address = $request->get('address', null);
        $salary = $request->get('salary', null);
        $id_office = $request->get('id_office', null);
        $query = $em->createQuery('UPDATE App:Employee e SET e.name = :name, e.address = :address, e.salary = :salary, e.id_office = :id_office, e.updated = current_timestamp() WHERE e.id = :id');

        $query->setParameter(':name',$name);
        $query->setParameter(':address',$address);
        $query->setParameter(':salary',$salary);
        $query->setParameter(':id_office',$id_office);
        $query->setParameter(':id',$id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = ['status' => 200,'message' => 'Se ha actualizado el empleado correctamente.'];
        }else{
            $data = ['status' => 400,'message' => 'No se ha actualizado el empleado correctamente.'];
        }

        return new JsonResponse($data);
    }
}
