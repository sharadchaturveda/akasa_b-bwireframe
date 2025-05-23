import {definePlugin} from 'sanity'
import './studio.css' // Import the custom CSS file

/**
 * A Sanity plugin to apply custom styles to the Studio.
 */
export const customStudioStyles = definePlugin({
  name: 'custom-studio-styles',
  studio: {
    // This is where you can configure custom components or themes.
    // For simply importing global CSS, the import statement above is often sufficient
    // if the Sanity build system is configured to process it.
    // If not, we might need to provide a custom theme or override a component.
  },
})
