# Logo Design Documentation

## Łukasz Pietrzyk - Dynamic TextPressure Logo

### Design Concept
The new logo uses an interactive TextPressure effect that responds to mouse movement, creating a dynamic and engaging experience. The text morphs and changes weight based on cursor proximity, representing the adaptive and responsive nature of professional coaching.

### Visual Elements

#### 1. **Dynamic Typography**
- **Main Text**: "Łukasz Pietrzyk" with interactive pressure effect
- **Compact Version**: "ŁP" for mobile and smaller spaces
- **Font**: Inter system font for maximum compatibility and readability
- **Weight Variation**: Characters become bolder when cursor approaches

#### 2. **Interactive Behavior**
- **Mouse Proximity**: Text weight increases as cursor gets closer
- **Smooth Animation**: 60fps animation with RAF (requestAnimationFrame)
- **Font Weight Range**: 400-900 for dynamic weight changes
- **Responsive Effect**: Adapts to different screen sizes and orientations

#### 3. **Technical Features**
- **Performance Optimized**: Uses efficient animation loops
- **Cross-Platform**: Works on desktop and mobile devices
- **Touch Support**: Responds to touch events on mobile
- **Accessibility**: Maintains readability and contrast standards

### Color Scheme

#### Primary Colors
- **Text Color**: Theme-aware (slate-800 in light mode, white in dark mode)
- **Hover State**: Transitions to accent colors (#007BFF / #3498DB)
- **Automatic Adaptation**: Inherits theme colors for consistency

### Typography

#### Full Logo
- **Main Text**: "Łukasz Pietrzyk" - Dynamic sizing based on container
- **Subtitle**: "COACHING & MENTORING" - Static, professional subtitle
- **Font Family**: Inter, system-ui, sans-serif for maximum compatibility

#### Compact Version
- **Text**: "ŁP" - Initials only with same dynamic effect
- **Usage**: Mobile headers and space-constrained areas
- **Maintains**: Same interactive behavior in smaller format

### Logo Variations

#### 1. **Full Logo** (Default)
- Complete name with dynamic effect
- Professional subtitle
- Dimensions: 300x50px + subtitle
- Used in desktop header

#### 2. **Compact Logo**
- Initials only with same effect
- No subtitle
- Dimensions: 80x40px
- Used in mobile header

### Interactive Features

#### Mouse/Touch Effects
- **Weight Modulation**: Characters become bolder near cursor
- **Smooth Transitions**: 15-frame smoothing for fluid motion
- **Distance Calculation**: Precise proximity detection per character
- **Touch Support**: Full touch event handling for mobile

#### Performance
- **60fps Animation**: Smooth, high-performance animation
- **RAF Optimization**: Uses requestAnimationFrame for best performance
- **Memory Efficient**: Proper cleanup of event listeners
- **Responsive**: Adapts to window resizing

### Usage Guidelines

#### Do's
- ✅ Allow space for the interactive effect
- ✅ Use on clean backgrounds for best visibility
- ✅ Maintain proper contrast ratios
- ✅ Test on both desktop and mobile devices

#### Don'ts
- ❌ Don't place on busy backgrounds
- ❌ Don't constrain the container too tightly
- ❌ Don't disable JavaScript (fallback needed)
- ❌ Don't use in print materials (static fallback required)

### Technical Implementation

#### File Structure
```
/components/TextPressure.tsx
- Core interactive component
- Handles mouse/touch events
- Manages font weight animations
- TypeScript interfaces

/components/Logo.tsx
- Logo wrapper component
- Handles compact vs full versions
- Manages click events and navigation
- Theme-aware styling
```

#### Props Interface
```typescript
interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}
```

### Brand Meaning
The dynamic logo represents:
- **Adaptability**: The responsive nature of effective coaching
- **Engagement**: Interactive elements that draw attention
- **Professionalism**: Clean, modern typography
- **Innovation**: Cutting-edge web technology showcasing modern approach
- **Personal Touch**: Each user's interaction creates a unique experience

### Performance Considerations
- **Optimized Animation**: Uses RAF for smooth 60fps performance
- **Memory Management**: Proper cleanup of event listeners
- **Mobile Optimization**: Touch event handling for mobile devices
- **Fallback Support**: Graceful degradation for older browsers

This dynamic logo system creates a memorable, interactive brand experience that reflects the personalized and adaptive nature of professional coaching services while maintaining excellent performance and accessibility standards.
