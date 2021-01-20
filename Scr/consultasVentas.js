 /* importe total de cada venta, de mayor a menor*/ 
 
 db.ventas.aggregate(
        [
            {
                $group: {
                    _id: { precio_unitario_venta: "$precio_unitario_venta" },
                    importe_cada_venta: { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } },
                    count: { $sum: 1 }
                }
            },
            {
              $sort:{importe_cada_venta:-1}
            }
        ]
    ) 
    

/* beneficio por mes y año */



db.ventas.aggregate(
  [
    {
      $group:
        {
          _id: { mes : {$month : "$fecha_venta"},
                año: { $year: "$fecha_venta" } },
          beneficio_anual: { $sum: { $multiply: [{ $subtract: ["$precio_unitario_venta", "$precio_unitario_coste"]}, "$unidades" ] } },
          count: { $sum: 1 }
        }
    }
  ]
)
/*media de beneficios por año*/
db.ventas.aggregate(
  [
    {
      $group:
        {
          _id: {año: { $year: "$fecha_venta" } },
          media_beneficio_anual:{$avg: { $sum: { $multiply: [{ $subtract: ["$precio_unitario_venta", "$precio_unitario_coste"]}, "$unidades" ] } } },
          count: { $sum: 1 }
        }
    }
  ]
)


/* mejores vendedores de la empresa, de mayor a menor importe total vendido */


db.ventas.aggregate(
  [
    {
      $group:{
          _id: {empleado:"$vendedor"},
         importe_total_venta: { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } }, 
         count:{$sum:1}
         } 
      },
      {
        $sort:{importe_total_venta:-1}
      }
    ])



/*mejores clientes*/

    db.ventas.aggregate(
      [
        {
          $group:{
              _id: {cliente:"$cliente"},
             importe_total_compra: { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } }, 
             count:{$sum:1}
             } 
          },
          {
            $sort:{importe_total_compra:-1}
          }
        ])


/*importe total de un empleado*/
db.ventas.aggregate([
  {
    $match:{vendedor:"Antonio Moreira"} /*podemos introducir cualquier vendedor de la empresa */
  },
  {
    $group:{
    _id:"$vendedor",
    importe_total_venta:  { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } },
    count:{$sum:1}
           } 
  }
])

/*importe total de un producto*/

db.ventas.aggregate([
  {
    $match:{nombre_producto:"barra_Z10KG"} /*podemos introducir cualquier producto de la empresa */
  },
  {
    $group:{
    _id:"$nombre_producto",
    importe_total_producto:  { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } },
    count:{$sum:1}
           } 
  }
])

/*detallado de una compra en concreto que nos ha hecho un  cliente*/
db.ventas.aggregate([
  {
    $match:{cliente:"FitnesScola"} /*podemos introducir cualquier cliente de la empresa */
  },
  {
    $group:{
    _id:["$cliente","$fecha_venta","$nombre_producto","$unidades"],
    importe_total_venta:  { $sum: { $multiply: ["$precio_unitario_venta", "$unidades"] } },
    count:{$sum:1}
          },
  }
])


    







 








                      
    

    









     
       
           








db.ventas.aggregate(
    [
      {
        $group:
          {
            _id: { beneficio_anual_mensual: { $year: "$fecha_venta" ,$month: "$fecha_venta" } },
            beneficio_total: { $sum: { $multiply: [{ $subtract: ["$precio_unitario_venta", "$precio_unitario_coste"]}, "$unidades" ] } },
            count: { $sum: 1 }
          }
      }
    ]
 )






 
    




    




