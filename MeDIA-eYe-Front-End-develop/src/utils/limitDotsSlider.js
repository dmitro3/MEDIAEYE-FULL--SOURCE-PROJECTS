import $ from 'jquery';

const limitDotsSlider = () => {
  $(document).ready(function () {
    $('.slick-dots li').removeClass('lg_dots').removeClass('sm_dots');
    $('li.slick-active').next().addClass('lg_dots');
    $('li.slick-active').next().next().addClass('sm_dots');
    $('li.slick-active').prev().addClass('lg_dots');
    $('li.slick-active').prev().prev().addClass('sm_dots');
  });
};

export default limitDotsSlider;
