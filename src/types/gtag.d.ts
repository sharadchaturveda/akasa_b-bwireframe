/**
 * Google Tag Manager and Google Analytics Type Definitions
 *
 * This file contains TypeScript type definitions for Google Tag Manager (GTM)
 * and Google Analytics 4 (GA4). These types are used for the global dataLayer
 * and gtag functions.
 */

interface Window {
  /**
   * Google Tag Manager dataLayer
   * Used to push events and data to GTM
   */
  dataLayer: Array<{
    event?: string;
    page?: string;
    pageTitle?: string;
    [key: string]: any;
  }>;

  /**
   * Google Analytics 4 (GA4) gtag function
   * This may be loaded by GTM if GA4 is configured in the GTM container
   */
  gtag?: Gtag.Gtag;
}

/**
 * Google Analytics 4 (GA4) namespace
 */
namespace Gtag {
  /**
   * Google Analytics 4 (GA4) gtag function
   */
  export interface Gtag {
    (command: 'config', targetId: string, config?: ControlParams | EventParams): void;
    (command: 'event', eventName: EventNames | string, eventParams?: ControlParams | EventParams): void;
    (command: 'set', config: CustomParams): void;
    (command: 'js', config: Date): void;
    (command: 'consent', consentArg: ConsentArg, consentParams: ConsentParams): void;
  }

  /**
   * Standard event names
   */
  export type EventNames =
    | 'add_payment_info'
    | 'add_shipping_info'
    | 'add_to_cart'
    | 'add_to_wishlist'
    | 'begin_checkout'
    | 'checkout_progress'
    | 'earn_virtual_currency'
    | 'exception'
    | 'generate_lead'
    | 'join_group'
    | 'level_end'
    | 'level_start'
    | 'level_up'
    | 'login'
    | 'page_view'
    | 'post_score'
    | 'purchase'
    | 'refund'
    | 'remove_from_cart'
    | 'search'
    | 'select_content'
    | 'select_item'
    | 'select_promotion'
    | 'share'
    | 'sign_up'
    | 'spend_virtual_currency'
    | 'tutorial_begin'
    | 'tutorial_complete'
    | 'unlock_achievement'
    | 'view_cart'
    | 'view_item'
    | 'view_item_list'
    | 'view_promotion'
    | 'view_search_results';

  /**
   * Control parameters
   */
  export interface ControlParams {
    groups?: string | string[];
    send_to?: string | string[];
    event_callback?: () => void;
    event_timeout?: number;
    [key: string]: any;
  }

  /**
   * Event parameters
   */
  export interface EventParams {
    page_title?: string;
    page_location?: string;
    page_path?: string;
    send_page_view?: boolean;
    [key: string]: any;
  }

  /**
   * Custom parameters
   */
  export interface CustomParams {
    [key: string]: any;
  }

  /**
   * Consent argument
   */
  export type ConsentArg = 'default' | 'update';

  /**
   * Consent parameters
   */
  export interface ConsentParams {
    ad_storage?: 'granted' | 'denied';
    analytics_storage?: 'granted' | 'denied';
    wait_for_update?: number;
    [key: string]: any;
  }
}
