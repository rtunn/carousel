# Carousel

A responsive carousel written in vanilla JS.

## Installation

Add the following lines to the head of your html file.

```html
<link
    rel="stylesheet"
    href="https://gitcdn.link/repo/rtunn/carousel/main/build/style.css"
/>
<script src="https://gitcdn.link/repo/rtunn/carousel/main/build/bundle.js"></script>
```

## Usage

Add the following to the desired section of your html file.

```html
<div class="Carousel">
    <div class="slide">
        <!-- ADD YOUR SLIDE CONTENT HERE -->
    </div>
    <div class="slide">
        <!-- ADD YOUR SLIDE CONTENT HERE -->
    </div>
</div>
```

Replace

```html
<!-- ADD YOUR SLIDE CONTENT HERE -->
```

with the markup for the given slide.

### Adding Slides

Copy the following

```html
<div class="slide">
    <!-- ADD YOUR SLIDE CONTENT HERE -->
</div>
```

and paste between the opening and closing tags of the Carousel div. Replace the comment with the markup for the new slide.

## Parameters

### Slide Direction

Values: 1 or -1

If set to 1, slides transition right-to-left.
If set to -1, slides transition left-to-right.

### Slide Duration

Values: int (ms)

How long the slide animation lasts in milliseconds.

### Slide Delay

Values: int (ms)

The time between slide transitions.

### Num Visible

Values: int

The number of slides visible at one time (while not in transition). The value must be less than the number of slides in the carousel.

### Break Points

Values: comma-separated sequence of int (px)

Break points allow for a different number of visible slides based on viewport width. Must be used in conjunction with Break Point Num Slides.

### Break Point Num Slides

Values: comma-separated sequence of int

The number of visibles slides at a given break point. The lengths of the of the Break Point Num Slides sequence and the Break Points sequence must be equal.

## Global Config

Carousel checks window for a carouselDefaultProps object. If the object exists, its attributes are used as the default values for all carousels.

```html
<script>
    window.carouselDefaultProps = {
        slideDirection: 1,
        slideDuration: 2000,
        slideDelay: 5000,
        numVisible: 1,
        breakPoints: '700,1500',
        breakPointNumSlides: '2,3',
    }
</script>
```

## Instance Config

Individual carousels may override global defaults by placing a data-attribute, for the respective parameter, in the Carousel div opening tag.

```html
<div
    class="Carousel"
    data-slide-direction="-1"
    data-slide-duration="3000"
    data-slide-delay="4000"
    data-num-visible="2"
    data-break-points="800, 1200"
    data-break-point-num-slides="3,4"
></div>
```
