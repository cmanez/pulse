$(document).ready(function(){
    // $('.carousel__inner').slick({
    //     /* adaptiveHeight: true, */
    //     speed: 1200,
    //     prevArrow:'<button type="button" class="slick-prev"><img src="img/icons/arrowleft.svg"></button>',
    //     nextArrow:'<button type="button" class="slick-next"><img src="img/icons/arrowright.svg"></button>',
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //             arrows:false,
    //             dots: true}
    //         }
    //     ]
    //   });
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item){
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });

    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click',function(){
        $('.overlay, #consultation').fadeIn();
    });
  
    $('.modal__close').on('click',function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });
    
    
    function validadeForms(form){
        $(form).validate({
            rules: {
                name: {
                        required: true,
                        minlength: 2
                      },
                phone: "required",
                email: {
                    required:true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен почтовый адрес"
                }
              }
        });
    };

    validadeForms('#consultation-form');
    validadeForms('#consultation form');
    validadeForms('#order form');
    
    jQuery(function($){
    $('input[name=phone]').mask("+7 (999) 999-9999");
    });


    $('form').submit(function(e){
        e.preventDefault();

        if(!$(this).valid()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });
    

    // $('.tns-nav').on('click', 'button:not(.tns-nav-active)', function() {
    //     $(this)
    //     .addClass('tns-nav-active').siblings().removeClass('tns-nav-active')
    //     .closest('div.container').find('.tns-nav button').removeClass('tns-nav-active').eq($(this).index()).addClass('tns-nav-active');
    // });
  });  
                                                                                                                     
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls:false,
    nav: true,
    responsive: {
        
        991: {
          nav: true,
          autoheight: true,
        //   navPosition: 'bottom',
        }
      }
  });

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

// const dotscontainer = document.querySelectorAll('.tns-nav button');
// dotscontainer.forEach(item =>{
//     item.classList.add('zalupa')
// });

    


