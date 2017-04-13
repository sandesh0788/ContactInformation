// Defining angularjs module
var app = angular.module('demoModule', []);

// Defining angularjs Controller and injecting ProductsService
app.controller('demoCtrl', function ($scope, $http, ProductsService) {

    $scope.productsData = null;
    // Fetching records from the factory created at the bottom of the script file
    ProductsService.GetAllRecords().then(function (d) {
        $scope.productsData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    // Calculate Total of Price After Initialization


    $scope.Contact = {
        id: '',
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email:'',
        Status: ''

    };

    // Reset product details
    $scope.clear = function () {
        $scope.Contact.id = '';
        $scope.Contact.FirstName = '';
        $scope.Contact.LastName = '';
        $scope.Contact.PhoneNumber = '';
        $scope.Contact.Email = '';
        $scope.Contact.Status = '';
    }

    //Add New Item
    $scope.save = function () {
        if ($scope.Product.FirstName != "" &&
            $scope.Product.LastName != "" && $scope.Product.Email != "" && $scope.Product.PhoneNumber != "" && $scope.Product.Status!="") {
           
            // or you can call Http request using $http
            $http({
                method: 'POST',
                url: 'api/ContactInfo/PostProduct/',
                data: $scope.Contact
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.productsData.push(response.data);
                $scope.clear();
                alert("Product Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Edit product details
    $scope.edit = function (data) {
        $scope.Product = { id: data.id, FirstName: data.FirstName, LastName: data.LastName, Email: data.Email, Status: data.Status };
    }

    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }

    // Update product details
    $scope.update = function () {
        if ($scope.Contact.FirstName != "" &&
            $scope.Contact.LastName != "" && $scope.Contact.PhoneNumber != "" && $scope.Contact.Email != "" && $scope.Contact.Status!="") {
            $http({
                method: 'PUT',
                url: 'api/ContactInfo/PutProduct/' + $scope.Contact.Id,
                data: $scope.Contact
            }).then(function successCallback(response) {
                $scope.productsData = response.data;
                $scope.clear();
                alert("Product Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    // Delete product details
    $scope.delete = function () {
        $http({
            method: 'PUT',
            url: 'api/ContactInfo/PutProduct/' + $scope.Contact.Id,
            data: $scope.Contact
        }).then(function successCallback(response) {
            $scope.productsData = response.data;
            $scope.clear();
            alert("Product Updated Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
            });
    };

});

// Here I have created a factory which is a popular way to create and configure services.
// You may also create the factories in another script file which is best practice.

app.factory('ProductsService', function ($http) {
    var fac = {};
    fac.GetAllRecords = function () {
        return $http.get('api/ContactInfo/GetAllProducts');
    }
    return fac;
});