$.fn.ImageTagging=function(options) 
{
	var x,y;
    if($(this).filter('img').length==0){
         return;
    }

	$(this).wrap('<div class="data-tagging-container"></div>');
    var CurrentCircle=null;
    $(this).attr('data-tagging','');

    if($(this).parents('body').filter('#data-tagging-modal').length==0){

        $(`
        <div class="modal fade" id="data-tagging-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Edit / Delete Tag</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input class="form-control">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary updateButton" >Update</button>
                <button type="button" class="btn btn-danger deleteButton">Delete</button>
              </div>
            </div>
          </div>
        </div>
        `).appendTo('body')

    }

    var img=$(this);
	var modal = $('.saveTag');
	
    img.on('mousedown',function(e){
 
		x=e.offsetX;
		y=e.offsetY;
		$('#data-tag').modal('show'); 
    })
	
	modal.on('mousedown',function(){
		var data = $('.signType:checked').val(); 
		if(data!=null && data.trim()!='')
		{
			var _new ={left:x , top:y , data:data};
			var points=img.data('points');
			points.push(_new);
			img.attr('data-points' , JSON.stringify(points));
			var name= $('#img1').attr('src');
			addPoints2Image(img);
			$.post("/home/tagAdd",  {
				name:name,
				points:JSON.stringify(points)
			}, function(){			
			}).done(function(data) {
			})
		}
	})
	var name= $('#img1').attr('src');

	$.post("home/tagSelect",  {
		name: name 
	}, function(){
	}).done(function(data) {
		img.height(400);
		img.width(600);
		if(data.substring(10)==="") {
			addPoints2Image(img);
		} else{			
			img.attr('data-points', data);
			addPoints2Image(img);
		}					  
  });

}

function addPoints2Image(img){
    img.parent().children().not('img').remove();
    img.parent().off();
    var points=img.data('points');
    if(points==undefined){
		points=[];
		img.attr('data-points',JSON.stringify(points));
    }
    console.log(points);
    for(i=0;i<points.length;i++){
       var point=points[i];
       var left=point.left-10;
       var top=point.top-10;
       var txt=point.data;
    
       img.parent().append('<div class="circle" style="top:' + top + ';left:' + left + '"  data-tooltip="' + txt +  '"  data-index=' + i +  ' data-toggle="modal" data-target="#data-tagging-modal">');
       img.parent().append('<div class="title" style="top:' + (top+50)  +  ';left:' + (left) +  '">' + txt + '</div>');
	   
    }
    
    
    
    img.parent().on('mouseenter','.circle',function(){
       $(this).next().toggleClass('selected');
       $(this).parent().find('.download').css('opacity',1)
    })
    
    img.parent().on('mouseleave','.circle',function(){
       $(this).next().toggleClass('selected')
       $(this).parent().find('.download').css('opacity',0)
    })
    
    img.parent().on('click','.circle',function(){
    var target=$(this).data('target');
    $(target).off();
    $(target).find('input.form-control').val($(this).data('tooltip'))
    
    $(target).on('click','.deleteButton',function(){
    
       var img=CurrentCircle.parent().find('img');
       var index=parseInt( CurrentCircle.data('index'));
       var points=img.data('points')
    
       points.splice(index,1)
    
       img.attr('data-points',JSON.stringify(points))
       addPoints2Image(img);
       $(target).modal('hide');
	   var name= $('#img1').attr('src');
		$.post("/home/tagUpdate",  {
			name:name,
			points:JSON.stringify(points)
		}, function(){			
		}).done(function(data) {			  
		})	   
    
    
    })
    $(target).on('click','.updateButton',function(){
       var img=CurrentCircle.parent().find('img');
       var index=parseInt( CurrentCircle.data('index'));
       var points=img.data('points')
       var txt=$(this).parents('.modal').find('input.form-control').val()
    
       if(txt!=null && txt.trim()!=''){
        points[index].data=txt;
        img.attr('data-point',JSON.stringify(points))
        addPoints2Image(img);
        $(target).modal('hide');
		var name= $('#img1').attr('src');
			$.post("/home/tagUpdate",  {
				name:name,
				points:JSON.stringify(points)
			}, function(){			
			}).done(function(data) {			  
			})
       }
    })  
    CurrentCircle=$(this);
    })
  }
 $('#img1').ImageTagging({
 }) 
   