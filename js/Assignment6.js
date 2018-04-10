function MenuChoice()
{
 if (document.getElementById("menu").value == "Show Area 1")
 {
 document.getElementById("customer").style.visibility = "visible";
 document.getElementById("orderinfo").style.visibility = "hidden";
 document.getElementById("deleteinfo").style.visibility = "hidden"; 
 }
 else if (document.getElementById("menu").value == "Show Area 2")
 {
 document.getElementById("customer").style.visibility = "hidden";
 document.getElementById("orderinfo").style.visibility = "visible";
 document.getElementById("deleteinfo").style.visibility = "hidden"; 
 }
else if (document.getElementById("menu").value == "Show Area 3")
 {
 document.getElementById("customer").style.visibility = "hidden";
 document.getElementById("orderinfo").style.visibility = "hidden";
 document.getElementById("deleteinfo").style.visibility = "visible"; 
 }
 else
 {
 document.getElementById("customer").style.visibility = "hidden";
 document.getElementById("orderinfo").style.visibility = "hidden";
 document.getElementById("deleteinfo").style.visibility = "hidden"; 
 }
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    var customercity = document.getElementById("custcity").value;
    
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername + '","City":"' + customercity + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status ==200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
    
function OperationResult(result) 
{
    if(result.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = " You have successfully added a customer!" ;
    }
    
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful." + "<br>" + result.Exception ;
    }
}
}

function UpdateOrderAddress()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var ordernum = document.getElementById("ordernumber").value;
    var shipadd = document.getElementById("shippingaddress").value;
    var shippingcity = document.getElementById("shipcity").value;
    var shippingname = document.getElementById("shipname").value;
    var shippingcode = document.getElementById("shipcode").value;
    
    var updateaddress = '{"OrderID":"' + ordernum + '","ShipAddress":"' + shipadd + '","ShipCity":"' + shippingcity + '","ShipName":"' + shippingname + '","ShipPostcode":"' + shippingcode + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if(objRequest.readyState == 4 && objRequest.status ==200)
        {
            var updaterecord = JSON.parse(objRequest.responseText);
            StatusResult(updaterecord);
        }
    }
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updateaddress);
    

function StatusResult(result)
{
    if(result == 1)
    {
        document.getElementById("status").innerHTML = "You have updated the shipping order information!";
    }
    else
    {
        document.getElementById("status").innerHTML = "The operation was not successful." + "<br>" + result.Exception;
    }
}

}

function DeleteCustomer()
{
   var objRequest = new XMLHttpRequest() ; 
   
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
   url += document.getElementById("delcustid").value; 

   objRequest.onreadystatechange = function()
   {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText) ;
            DeletionResult(output) ; 
        }
   }
   
   objRequest.open("GET", url, true) ;
  var check = confirm("Do you wish to delete?");
   if(check == true)
   {
     objRequest.send() ; 


function DeletionResult(result)
{
      if(result.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("completion").innerHTML = " You have successfully deleted a customer from the database!" ;
    }
    
    else
    {
        document.getElementById("completion").innerHTML = "The operation was not successful." + "<br>" + output.Exception ;
    }  
}
   }
   else
   {
   document.getElementById("completion").innerHTML= "Your request was canceled.";   
   }
  
}