jQuery(document).ready(function($){
	var objDosa = {
		ajaxurl:'wp-admin/admin-ajax.php',

		/* We are initiating the JS here*/
		initDosa:function(){
			this.inputEvents();
		},
		
		// All input actions can be added here such as click, hover, key
		inputEvents:function(){
			// Add Slick Carousel
			this.addSlickCarousel();
			this.initStripeToken();
			// Left main category image
			$('.slick-carousel-image').click(function(){
				// Get term ParentId
				var intTermId 	  = parseInt($(this).attr('data-id'));
				// Get term Child Id
				var strChildCheck = $(this).attr('data-child');
				// If we got Term than trigger this function				
				if(intTermId>0){
					objDosa.showSubMenu(intTermId,strChildCheck);
				}
			});
			$('.product-inner-box').click(function(){
				var arrData = []; 
				arrData['product_id'] 	= $(this).attr('id');
				arrData['title'] 		= $(this).find('.item-title').text();
				arrData['price'] 		= parseFloat($(this).find('.price-value').text());
				arrData['description']  = $(this).find('.product-inner-box-description').text();
				arrData['style'] 		= $(this).find('.item-image').attr('style');

				objDosa.openProductView(arrData);
			});

			$('.close-modals').click(function(){
				objDosa.closeProductView();
			});

	    	$('#plus').bind('click', {increment: 1}, objDosa.incrementValue);
	    	$('#minus').bind('click', {increment: -1}, objDosa.incrementValue);

	    	$('.add-to-order').click(function(){
	    		var intValue = parseInt($('#value').text());
	    		var intPid   = parseInt($(this).attr('data-pid'));
				objDosa.addToOrder(intPid,intValue);
			});

			$('.order-button').click(function(e){
				e.preventDefault();
				objDosa.showModalView($('.order-container'));
			});
	    	
	    	$(document).on('submit','#add-new-entry-form',function(event){
	    		event.preventDefault();
				objDosa.addNewEntry();
			});

			$(document).on('click','.square-touch',function(){
				$('.square-touch').removeClass('active-entry-type');
				$(this).addClass('active-entry-type');
			});

			$(document).on('click','.circle-touch',function(){
				$('.circle-touch').removeClass('active-table');
				$(this).addClass('active-table');
				strTable = $(this).text();
				objDosa.addTable(strTable);
			});

			$(document).on('change','.order-modal-product-value',function(){
				var intValue = parseInt($(this).val());
				var intProductId 	= parseInt($(this).attr('data-product-id'));
				objDosa.qtyChangedOnOrderModal(intValue,intProductId);
			});

			$(document).on('click','.panel-inner-heading',function(event){
				objDosa.toggleSubPanels($(this));
			});

			$(document).on('click','.pay-view',function(event){
				var strClass = $(this).attr('data-view');
				$('.payments-container').hide();
				$('.'+strClass).show();
			});

			$(document).on('click','.cancel-order',function(event){
				event.preventDefault();
				objDosa.cancelOrder();
			});

			$(document).on('click','.pay',function(e){
				e.preventDefault();
				objDosa.showModalView($('.pay-button-container'));
				$('.pay-button-container').css('display','grid');
			});

			$(document).on('click','.new-entry',function(e){
				e.preventDefault();
				objDosa.showModalView($('.entry-container'));
			});

			$(document).on('click','.assign-table',function(e){
				e.preventDefault();
				objDosa.showModalView($('.table-container'));
			});

			$(document).on('click','.remove-product-by-id',function(e){
				var intProductId = parseInt($(this).attr('id'));
				objDosa.removeProduct(intProductId);
			});

			$(document).on('click','.sub-level-inner',function(e){
				$(this).attr('data-clicked',true);
				var intTermId = parseInt($(this).attr('data-child'));
				if(!$(this).hasClass('show-icon')){
					$(this).addClass('show-icon');
					$('.term-'+intTermId).show();
				}else{
					$('.term-'+intTermId).hide();
					$(this).removeClass('show-icon');
				}
			});
		},

		/*This function init slick here */
		addSlickCarousel:function(){
			$('.slick-carousel').slick({
		        vertical: true,
		        slidesToShow: 6,
		        slidesToScroll: 2,
		        verticalSwiping: true,
		        infinite:true,
		        prevArrow: $('.slick-top-arrow'),
		  		nextArrow: $('.slick-bottom-arrow')
    		});
		},
		addTable:function(strTable){
			if(strTable.length>0){
				var objData = {
					action: 'add_table',
					table: strTable
				};
				// Get Respone back send send response array to next function
				$.getJSON(objDosa.ajaxurl, objData, function(objResponse){
					if(objResponse.error == false){
						if(objResponse.cart_string.length>0){
				        	objDosa.updateAppStates(objResponse);
				    		objDosa.showModalView($('.order-container'));    	
						}
					}
				});
			}
		},
		addNewEntry:function(){
			var strEntryType = $('.active-entry-type').attr('value');
			var entryAmount  = $('#new-entry-to-order').val();
			if(strEntryType.length>0){				
				var objData = {
					action: 'add_new_entry',
					entry_type: strEntryType,
					entry_amount:entryAmount
				};
				// Get Respone back send send response array to next function
				$.getJSON(objDosa.ajaxurl, objData, function(objResponse){
					if(objResponse.error == false){
						if(objResponse.cart_string.length>0){
				        	objDosa.updateAppStates(objResponse);
				    		objDosa.showModalView($('.order-container'));    	
						}
					}
				});
			}
		},
		showSubMenu:function(intTermId, strChildCheck){
			objDosa.hideAllViews();
			$('.sub-level-inner').removeClass('show-icon');
			if(strChildCheck == 'true'){
				objDosa.toggleChildren(intTermId,'show');
			}else{
				objDosa.toggleChildren(intTermId,'hide');
			}
		},

		toggleChildren:function(intTermId = null ,event){
			if(event == 'show'){
				$('.product-inner-box').hide();
				$('.sub-level-childrens').show();
				$('.sub-level-inner').hide();
				$('[data-parent="'+intTermId+'"]').show();
			}
			if(event == 'hide'){
				$('.term-'+intTermId).show();
				$('.sub-level-childrens').hide();
				$('.sub-level-inner').hide();
				$('[data-parent="'+intTermId+'"]').hide();
			}
		},

		toggleSubPanels:function(objThis){
			if(!objThis.next().hasClass('show-sub-panel')){
				objThis.next().addClass('show-sub-panel');
				objThis.find('i').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
			}else{
				objThis.find('i').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
				objThis.next().removeClass('show-sub-panel');
			}
		},

		cancelOrder:function(){

			var objData = {
				action: 'destroy_my_session',
			};
			// Get Respone back send send response array to next function
			$.getJSON(objDosa.ajaxurl, objData, function(objResponse){
				if(objResponse.error == false){
					if(objResponse.cart_string.length>0){
						objDosa.updateAppStates(objResponse);
						objDosa.showModalView($('.order-container'));
					}
				}
			});
		},

		removeProduct:function(intProductId){
			var objData = {
				action: 'remove_product',
				id:intProductId
			};
			// Get Respone back send send response array to next function
			$.getJSON(objDosa.ajaxurl, objData, function(objResponse){
				if(objResponse.error == false){
					if(objResponse.cart_string.length>0){
						objDosa.updateAppStates(objResponse);
						objDosa.showModalView($('.order-container'));
					}
				}
			});
		},

		openProductView:function(arrData){
			objDosa.resetModal();
			objDosa.injectValuesInModal(arrData);
			objDosa.showModalView($('.current-modal'));
		},
		resetModal:function(){
			$('#modal-price-value').attr('data-original',0);
			$('.modal-title').text('');
			$('#modal-price-value').text(0);
			$('.modal-image').attr('style','');
			$('.modal-description').html('');
			$('.add-to-order').removeAttr('data-pid');
			$('.success-message').hide();
			$('.success-message').html('');
			$('#value').text('0');
		},
		injectValuesInModal:function(arrData){
			$('.modal-title').text(arrData.title);
			$('#modal-price-value').attr('data-original',arrData.price);
			$('.add-to-order').attr('data-pid',arrData.product_id);
			$('.modal-description').html(arrData.description);
			$('.modal-image').attr('style',arrData.style);
		},
		closeProductView:function(){			
			$('.product-inner-box').show();
			$('.current-modal').hide();
		 	objDosa.toggleChildren(null,'hide');
		},

		incrementValue:function(e){
			var valueElement = $('#value');
			var newValue = Math.max(parseInt(valueElement.text()) + e.data.increment, 0);
			var intPrice = parseFloat($("#modal-price-value").attr('data-original'));

			valueElement.text(newValue);
			$("#modal-price-value").text(newValue*intPrice);
			return false;
		},

		addToOrder:function(intPid,intValue){
			// Send Action to cart controller 
			objDosa.spinnerToggle($('.add-to-order'),null,'start');
	        var objData = {
	            action: 'add_to_order',
	            id: intPid,
	            value: intValue
	        };

	        // Get Respone back send send response array to next function
	        $.getJSON(objDosa.ajaxurl, objData, function(objResponse){
	            if(objResponse.error == false){
	            	if(objResponse.success_message.length>0){
	            		$('.success-message').show();
	            		$('.success-message').html(objResponse.success_message);
	            		objDosa.spinnerToggle($('.add-to-order'),'Add To Order','stop');
			        	objDosa.updateAppStates(objResponse);
			    		objDosa.showModalView($('.order-container'));   
	            	}
	            }
	        });
		},
		spinnerToggle:function(objHtml,strText = null,strEvent){
			if(strEvent == 'start'){
				objHtml.html('<i class="fas fa-stroopwafel fa-spin"></i>');
			}
			if(strEvent == 'stop'){
				objHtml.html(strText);
			}
		},
		qtyChangedOnOrderModal:function(intValue,intProductId){
			objDosa.spinnerToggle($('#price-col-'+intProductId) ,null,'start');
			var objData = {
	            action: 'modal_change_trigger',
	            id: intProductId,
	            value: intValue
	        };
	        // Get Respone back send send response array to next function
	        $.getJSON(objDosa.ajaxurl, objData, function(objResponse){
	        	objDosa.updateAppStates(objResponse);
	    		objDosa.showModalView($('.order-container'));    	    
	        });
		},		
		showModalView:function(strEvent){
			objDosa.hideAllViews();
			strEvent.show();
		},
		hideAllViews:function(){
			$('.order-container').hide();
			$('.current-modal').hide();
			$('.product-inner-box').hide();
			$('.payments-container').hide();
			$('.sub-level-childrens').hide();
			$('.entry-container').hide();
			$('.table-container').hide();
			$('.pay-button-container').hide();
		},
		updateAppStates(objResponse){
			if(objResponse.cart_string.length>0){
				$('.ajax-cart').html(objResponse.cart_string);
			}
			
			(objResponse.show_buttons == true) ? objDosa.showTopOrderButtons('show') : objDosa.showTopOrderButtons('hide');
			$('#total-order-button').html(objResponse.total_items);
			if(objResponse.total_items == null){
				$('.entry-modal').hide();
				$('.table-modal').hide();
			}else{
				$('.entry-modal').show();
				$('.table-modal').show();
			}
			$('.total-payment-button').html(objResponse.total);			
			$('.order-ajax-hook').hide();
			$.each(objResponse.products, function() {
				var intProductId = this.id; 
				var intValue 	 = this.value;
				$('#order-ajax-hook-'+intProductId).html('<span class="order-in-cart">'+intValue+' in <i class="fas fa-shopping-cart"></i></span>');
				$('#order-ajax-hook-'+intProductId).show();
			});
		},
		showTopOrderButtons:function(strEvent){
			if(strEvent == 'show'){
				$('.top-bar-order-buttons').removeClass('hide-out');
			}
			if(strEvent == 'hide'){
				$('.top-bar-order-buttons').addClass('hide-out');
			}
		},
		handlePayment:function(arrToken){
			var orderFirstName 	= $('.order_first_name').val();
			var orderLastName 	= $('.order_last_name').val();
			var orderEmail 		= $('.order_email').val();

			arrToken['first_name'] 	= orderFirstName;
			arrToken['last_name'] 	= orderLastName;
			arrToken['email'] 		= orderEmail;

			var objData = {
	            action: 'pay_online',
	            data:arrToken
	        };
	        // Get Respone back send send response array to next function
	        $.getJSON(objDosa.ajaxurl, objData, function(objResponse){
	        	objDosa.updateAppStates(objResponse);
	    		objDosa.showModalView($('.order-container'));   	    
	        });
		},
		toggleOrderPanel:function(){
			if(!$('.order-panel-body').hasClass('panel-close')){
				$('.order-panel-body').addClass('panel-close');
				$('.order-panel').find('i').removeClass('fa-minus').addClass('fa-plus');
			}else{
				$('.order-panel-body').removeClass('panel-close');
				$('.order-panel').find('i').removeClass('fa-plus').addClass('fa-minus');
			}
			
		},
		initStripeToken:function(){
			var stripe = Stripe('pk_test_4XYGB3CoAdk33nZ538jBkkK200JCPzVa8u');
			var elements = stripe.elements();
			var style = {
			base: {
				color: '#32325d',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#aab7c4'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
				}
			};

			// Create an instance of the card Element.
			var card = elements.create('card', {style: style});
			// Add an instance of the card Element into the `card-element` <div>.
			card.mount('#card-element');
			// Handle real-time validation errors from the card Element.
			card.on('change', function(event) {
				var displayError = document.getElementById('card-errors');
				if (event.error) {
					displayError.textContent = event.error.message;
				} else {
					displayError.textContent = '';
				}
			});

			// Handle form submission.
			var form = document.getElementById('payment-form');
			form.addEventListener('submit', function(event){
				event.preventDefault();
				stripe.createToken(card).then(function(result){
					if(result.error){
						var errorElement = document.getElementById('card-errors');
						errorElement.textContent = result.error.message;
					} 
					else{
						objDosa.stripeTokenHandler(result.token);
					}
				});
			});
		},
		stripeTokenHandler:function(token){
			var form = document.getElementById('payment-form');
			var hiddenInput = document.createElement('input');
			hiddenInput.setAttribute('type', 'hidden');
			hiddenInput.setAttribute('name', 'stripeToken');
			hiddenInput.setAttribute('value', token.id);
			form.appendChild(hiddenInput);
			objDosa.handlePayment(token);
		}
	};
	objDosa.initDosa();
});
