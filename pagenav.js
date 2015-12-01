(function(){
	var $$=function(tag){return $(document.createElement(tag));};
	$.fn.PageNavigator=function(ops){
		this.defaults={
			pageSize:10,
			pageIndex:1,
			recordCount:1,
			pageCount:1,
			showPageNum:2,
			jump:function(){}
		};

		$.extend(this.defaults,ops);

		var PageButton=function(conf){
			this.conf={
				label:'',
				cls:'',
				jump:function(){}	
			};
			$.extend(this.conf,conf);
			this.init();	
		};

		$.extend(PageButton.prototype,{
			init:function(){
				this.el=$$('a');
				this.el.attr('href','javascript:void(0)');
				this.copyMethods();
				this.addClass(this.conf.cls);
				this.update(this.conf.label);
				this.el.click($.proxy(this.jump,this));	
			},
			appendTo:function(el){
				el.append(this.el);	
			},
			copyMethods:function(){
				var methods={
					addClass:$.proxy(this.el.addClass,this.el),
					removeClass:$.proxy(this.el.removeClass,this.el),
					css:$.proxy(this.el.css,this.el)	
				};
				$.each(methods,$.proxy(function(name,fn){
					this[name]=fn;	
				},this));	
			},
			update:function(html){
				this.el.html(html);	
			},
			jump:function(){
				this.conf.jump();	
			}	
		});


		$.extend(this,{
			init:function(){
				var _default=this.defaults;
				_default.pageCount=Math.ceil(_default.recordCount/_default.pageSize);

				this.ButtonList=this.load();
				this.appendChild();	
			},
			load:function(){
				var list=new Array,
				_default=this.defaults;
				if(_default.pageIndex<1)
					_default.pageIndex=1;
				if(_default.pageIndex>_default.pageCount)
					_default.pageIndex=_default.pageCount;

		this.prev=new PageButton({
			cls:'prev',
			label:'<',
			jump:$.proxy(function(){this.jump(_default.pageIndex-1);},this)
		});
		this.next=new PageButton({
			cls:'next',
			label:'>',
			jump:$.proxy(function(){this.jump(_default.pageIndex+1);},this)	
		});

		_default.pageCount=Math.ceil(_default.recordCount/_default.pageSize);
		var startIndex=_default.pageIndex-_default.showPageNum;
		var endIndex=_default.pageIndex+_default.showPageNum;

		if(startIndex<1){
			var other=Math.abs(startIndex)+1;
			startIndex=1;
			if(endIndex>_default.pageCount){
				endIndex=_default.pageCount;	
			}else{
				endIndex+=other;
				if(endIndex>_default.pageCount)
					endIndex=_default.pageCount;	
			}	
		}

		if(endIndex>_default.pageCount){
			var _other=endIndex-_default.pageCount;
			endIndex=_default.pageCount;
			if(startIndex>0){
				startIndex-=_other;
				if(startIndex<1)
					startIndex=1;
			}else{
				startIndex=1;	
			}		
		}

		for(var _i=startIndex;_i<=endIndex;_i++){
			var Bt=new PageButton({
				label:_i,
				cls:_i==_default.pageIndex?'current':'',
				jump:(function(inde){return $.proxy(function(){this.jump(inde)},this);}).call(this,_i)	
			});
			list.push(Bt);	
		}

		return list;
			},
			update:function(overRide){
				var _default=this.defaults;
				overRide=true;
				if(overRide){
					this.ButtonList=this.load();
					this.appendChild();	
				}else{	
					$.each(this.ButtonList,function(index,Bt){
						Bt.removeClass('current');	
					});
					this.ButtonList[_default.pageIndex-1].addClass('current');
				}
			},
			appendChild:function(){
				this.html('');
				this.prev.appendTo(this);
				$.each(this.ButtonList,$.proxy(function(index,Bt){
					Bt.appendTo(this);	
				},this));
				this.next.appendTo(this);
			},
			jump:function(toPage){
				var _default=this.defaults;
				if(toPage<1||toPage>_default.pageCount||toPage==_default.pageIndex)return;
				_default.pageIndex=toPage;
				this.update();
				_default.jump(toPage);	
			}	
		});
		this.init();
		return this;	
	};

	$.fn.PN=$.fn.PageNavigator;	
})();

