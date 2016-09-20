<?php

/**
 * Implementation of hook_theme().
 */
function osbee_theme() {
  $items = array();

  // Split out pager list into separate theme function.
  $items['pager_list'] = array('arguments' => array(
    'tags' => array(),
    'limit' => 10,
    'element' => 0,
    'parameters' => array(),
    'quantity' => 9,
  ));
  $items['twitter_simple'] = array('arguments' => array(
    'tweets' => NULL,
    'twitkey' => NULL,
    'title' => NULL,
    'template' => 'twitter-simple',

  ));

  return $items;
}


/**
 * Implements hook_menu_local_task()
 *
 * @param array $vars
 *
 * return string with html
 */
function osbee_menu_local_task($vars) {
  $link = $vars['element']['#link'];
  // remove the view link when viewing the node
  if ($link['path'] == 'node/%/view') return false;
  $link['localized_options']['html'] = TRUE;
  return '<li>'.l($link['title'], $link['href'], $link['localized_options']).'</li>'."\n";
}

/**
 * Implements hook_menu_local_task()
 *
 * @param array $vars
 *
 * return string with html
 */
function osbee_menu_local_tasks(&$vars) {
  $output = '';
  $has_access = user_access('access contextual links');
  if (!empty($vars['primary'])) {
    $vars['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';

    // Only display contextual links if the user has the correct permissions enabled.
    // Otherwise, the default primary tabs will be used.
    $vars['primary']['#prefix'] = ($has_access) ?
      '<div class="contextual-links-wrapper"><ul class="contextual-links">' : '<ul class="tabs primary">';

    $vars['primary']['#suffix'] = ($has_access) ?
      '</ul></div>' : '</ul>';
    $output .= drupal_render($vars['primary']);
  }
  if (!empty($vars['secondary'])) {
    $vars['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $vars['secondary']['#prefix'] = '<ul class="tabs secondary clearfix">';
    $vars['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($vars['secondary']);
  }
  return $output;
}

function osbee_css_alter(&$css) {
  $exclude = array(
    'sites/all/modules/nice_menus/nice_menus_default.css' => FALSE,
  );
  $css = array_diff_key($css, $exclude);
}

function osbee_preprocess_node(&$vars) {
  if (!empty($vars['content']['field_image']) || !empty($vars['content']['field_small_image_gallery'])) {
    if (!empty($vars['content']['field_menu_block'])) {
      $vars['content']['field_image'][0]['#image_style'] = 'small_page_image';
      $class = 'narrow-body';
    } else {
      $class = 'narrow-body';
    }
    $vars['content']['body'] = array(
      '#prefix' => '<div class="' . $class . '">',
      '#suffix' => '</div>',
      '#markup' => render($vars['content']['body']),
      '#weight' => $vars['content']['body']['#weight'],
    );
  }
  if (!empty($vars['content']['field_prev_page'])) {
    $vars['content']['field_prev_page'][0]['#title'] = t('previous');
  }
  if (!empty($vars['content']['field_next_page'])) {
    $vars['content']['field_next_page'][0]['#title'] = t('next');
  }

  if($vars['type'] === 'portfolio_item') {
    $vars['content']['field_portfolio_type']['#weight'] = -1;
    $vars['content']['field_portfolio_type'][0]['#markup'] .= ':';
    $vars['content']['portfolio-title'] = array(
      '#markup' => '<h1 class="term-name">' . $vars['title'] . '</h1>',
      '#weight' => 1,
    );
  }

}

function osbee_preprocess_image(&$vars) {
  if (!empty($vars['style_name'])) {
    $vars['attributes']['class'][] = $vars['style_name'];
  }
}

function osbee_preprocess_html(&$vars) {
  drupal_add_js('http://use.typekit.net/kdi8hrw.js', 'external');
  drupal_add_js('try{Typekit.load();}catch(e){}', 'inline');
  drupal_add_js('sites/all/libraries/jquery.cycle/jquery.cycle.all.js');
  drupal_add_js('sites/all/libraries/swipebox/source/jquery.swipebox.min.js');
  drupal_add_css('sites/all/libraries/swipebox/source/swipebox.css');


  $vars['head_title'] = decode_entities($vars['head_title']);

  $viewport = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' =>  'viewport',
      'content' => 'width=1150',
    ),
  );
  $keywords = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'keywords',
      'content' => 'high end home theaters, high end home theatres, custom home theaters, custom home theatres, home theater design, home theater installation, home entertainment, media rooms, custom installation, whole house audio, surround-sound systems, mirror tv, a/v, smart homes, home automation, whole house automation, touch screens, touch panels, video distribution, audio distribution, lighting automation, lighting control, custom lighting, automated shades, custom shades, home energy management, home energy conservation, automated climate control, home computer networks, small business data networks, data networks for traders, structured wiring, low-voltage wiring, home security systems, home surveillance, Lutron, Crestron, Crestron Integration Awards, high-end, New York City, New York, NY, Westchester, Connecticut, Fairfield County, CT, Greenwich, New Jersey, NJ, Miami, FL, Florida, Paris, Israel',
    ),
  );
  $description = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'description',
      'content' => 'Osbee provides design, engineering and installation of high end custom whole-house automation systems, whole-house audio and video systems, and custom home theaters. We also engineer and install data networks for small business, including traders and advertising agencies.
',
    ),
  );

  $iosHideSafariUI = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'apple-mobile-web-app-capable',
      'content' => 'yes',
    )
  );

  $iosHideStatusBar = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'apple-mobile-web-app-status-bar-style',
      'content' => 'black',
    )
  );

  // Add header meta tag for IE to head
  drupal_add_html_head($viewport, 'viewport');
  drupal_add_html_head($description, 'description');
  drupal_add_html_head($keywords, 'keywords');
  drupal_add_html_head($iosHideSafariUI, 'ios-webapp-cap');
  drupal_add_html_head($iosHideStatusBar, 'ios-webapp-status');
}


function osbee_menu_link(array $vars) {
  $element = $vars['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  if ($vars['element']['#original_link']['menu_name'] == 'main-menu') {
    return '<li' . drupal_attributes($element['#attributes']) . '><span class="menu-link-wrapper">' . $output . $sub_menu . "</span></li>\n";
  } else {
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
  }
}



/**
 * Override of theme_pager().
 * Easily one of the most obnoxious theming jobs in Drupal core.
 * Goals: consolidate functionality into less than 5 functions and
 * ensure the markup will not conflict with major other styles
 * (theme_item_list() in particular).
 */
function osbee_pager($vars) {
  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];
  $quantity = $vars['quantity'];
  $pager_list = theme('pager_list', $vars);

  $links_prev = array();
  $links_next = array();
/*  $links_prev['pager-first'] = theme('pager_first', array(
    'text' => (isset($tags[0]) ? $tags[0] : t('First')),
    'element' => $element,
    'parameters' => $parameters
  ));*/
  $links_prev['pager-previous'] = theme('pager_previous', array(
    'text' => (isset($tags[1]) ? $tags[1] : t('«')),
    'element' => $element,
    'interval' => 1,
    'parameters' => $parameters
  ));
  $links_next['pager-next'] = theme('pager_next', array(
    'text' => (isset($tags[3]) ? $tags[3] : t('»')),
    'element' => $element,
    'interval' => 1,
    'parameters' => $parameters
  ));
 /* $links_next['pager-last'] = theme('pager_last', array(
    'text' => (isset($tags[4]) ? $tags[4] : t('Last')),
    'element' => $element,
    'parameters' => $parameters
  ));*/

  $links_prev = array_filter($links_prev);
  $links_next = array_filter($links_next);
  $pager_links_prev = theme('links', array(
    'links' => $links_prev,
    'attributes' => array('class' => 'links pager pager-links')
  ));
  $pager_links_next = theme('links', array(
    'links' => $links_next,
    'attributes' => array('class' => 'links pager pager-links')
  ));
  if ($pager_list) {
    return "<div class='pager clearfix'>$pager_links_prev $pager_list $pager_links_next</div>";
  }
}

/**
 * Split out page list generation into its own function.
 */
function osbee_pager_list($vars) {
  $tags = $vars['tags'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];
  $quantity = $vars['quantity'];

  global $pager_page_array, $pager_total;
  if ($pager_total[$element] > 1) {
    // Calculate various markers within this pager piece:
    // Middle is used to "center" pages around the current page.
    $pager_middle = ceil($quantity / 2);
    // current is the page we are currently paged to
    $pager_current = $pager_page_array[$element] + 1;
    // first is the first page listed by this pager piece (re quantity)
    $pager_first = $pager_current - $pager_middle + 1;
    // last is the last page listed by this pager piece (re quantity)
    $pager_last = $pager_current + $quantity - $pager_middle;
    // max is the maximum page number
    $pager_max = $pager_total[$element];
    // End of marker calculations.

    // Prepare for generation loop.
    $i = $pager_first;
    if ($pager_last > $pager_max) {
      // Adjust "center" if at end of query.
      $i = $i + ($pager_max - $pager_last);
      $pager_last = $pager_max;
    }
    if ($i <= 0) {
      // Adjust "center" if at start of query.
      $pager_last = $pager_last + (1 - $i);
      $i = 1;
    }
    // End of generation loop preparation.

    $links = array();

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      // Now generate the actual pager piece.
      for ($i; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $links["$i pager-item"] = theme('pager_previous', array(
            'text' => $i,
            'element' => $element,
            'interval' => ($pager_current - $i),
            'parameters' => $parameters
          ));
        }
        else {
        //  $links["$i pager-prev"] = array('title' => $i);
        }
        if ($i == $pager_current) {
          $links["$i pager-current"] = array('title' => $i);
        }
        if ($i > $pager_current) {
          $links["$i pager-item"] = theme('pager_next', array(
            'text' => $i,
            'element' => $element,
            'interval' => ($i - $pager_current),
            'parameters' => $parameters
          ));
        }
        else {
          //$links["$i pager-next"] = array('title' => $i);
        }
      }
      return theme('links', array(
        'links' => $links,
        'attributes' => array('class' => 'links pager pager-list')
      ));
    }
  }
  return '';
}

/**
 * Return an array suitable for theme_links() rather than marked up HTML link.
 */
function osbee_pager_link($vars) {
  $text = $vars['text'];
  $page_new = $vars['page_new'];
  $element = $vars['element'];
  $parameters = $vars['parameters'];
  $attributes = $vars['attributes'];

  $page = isset($_GET['page']) ? $_GET['page'] : '';
  if ($new_page = implode(',', pager_load_array($page_new[$element], $element, explode(',', $page)))) {
    $parameters['page'] = $new_page;
  }

  $query = array();
  if (count($parameters)) {
    $query = drupal_get_query_parameters($parameters, array());
  }
  if ($query_pager = pager_get_query_parameters()) {
    $query = array_merge($query, $query_pager);
  }

  // Set each pager link title
  if (!isset($attributes['title'])) {
    static $titles = NULL;
    if (!isset($titles)) {
      $titles = array(
        t('« first') => t('Go to first page'),
        t('‹ previous') => t('Go to previous page'),
        t('next ›') => t('Go to next page'),
        t('last »') => t('Go to last page'),
      );
    }
    if (isset($titles[$text])) {
      $attributes['title'] = $titles[$text];
    }
    else if (is_numeric($text)) {
      $attributes['title'] = t('Go to page @number', array('@number' => $text));
    }
  }

  return array(
    'title' => $text,
    'href' => $_GET['q'],
    'attributes' => $attributes,
    'query' => count($query) ? $query : NULL,
  );
}


function osbee_preprocess_search_result(&$vars) {
  $vars['thumb'] = '';
  if (!empty($vars['result']['node'])) {
    if (!empty($vars['result']['node']->field_thumbnail)) {
      $thumb = field_view_field('node', $vars['result']['node'], 'field_thumbnail');
      $thumb['#label_display'] = 'hidden';
      $thumb[0]['#image_style'] = 'thumbnail';
      $vars['thumb'] = l(render($thumb), 'node/' . $vars['result']['node']->nid, array('html' => TRUE));
    }
    elseif ($vars['result']['node']->type == 'blog_post') {
      $thumb = field_view_field('node', $vars['result']['node'], 'field_image');
      $thumb['#label_display'] = 'hidden';
      $thumb[0]['#image_style'] = 'thumbnail';
      $vars['thumb'] = l(render($thumb), 'node/' . $vars['result']['node']->nid, array('html' => TRUE));
    }
    elseif ($vars['result']['node']->type == 'kb_article') {
      $term = taxonomy_term_load($vars['result']['node']->field_category['und'][0]['tid']);
      $thumb = field_view_field('taxonomy_term', $term, 'field_thumbnail');
      $thumb['#label_display'] = 'hidden';
      $thumb[0]['#image_style'] = 'thumbnail';
      $vars['thumb'] = l(render($thumb), 'node/' . $vars['result']['node']->nid, array('html' => TRUE));
    }
  }
}


function osbee_process_views_exposed_form(&$vars) {
  /*if (!empty($vars['form']['field_category_tid'])) {
    foreach ($vars['form']['field_category_tid']['#options'] as &$option) {
      if (!empty($option->option)) {
        $opt = $option->option;
        //dpm($option->option);
        foreach ($opt as $key => &$val) {
          $val = str_replace('-', '&ndash;&ndash;&ndash;', $val);
          $option->option[$key] = $val;
        }
        //dpm($option->option);
      }
    }
    dpm($vars['form']);
  }*/
}

function osbee_form_views_exposed_form_alter(&$form, &$form_state, $form_id) {
  if ($form['#id'] == 'views-exposed-form-kb-search-page') {
    if (!empty($form['field_category_tid'])) {
      foreach ($form['field_category_tid']['#options'] as $optkey => &$option) {
        if (!empty($option->option)) {
          $opt = $option->option;
          foreach ($opt as $key => $val) {
            $val = preg_replace('/^\-|\G-/', '---', $val);
            $option->option[$key] = $val;
          }
        }
      }
      $form['field_category_tid']['#options']['All'] = t('All Categories');
    }
  }
}

function osbee_file_link($variables) {
  $file = $variables['file'];
  $icon_directory = $variables['icon_directory'];

  $url = file_create_url($file->uri);
  $icon = theme('file_icon', array('file' => $file, 'icon_directory' => $icon_directory));

  // Set options as per anchor format described at
  // http://microformats.org/wiki/file-format-examples
  $options = array(
    'attributes' => array(
      'type' => $file->filemime . '; length=' . $file->filesize,
      'target' => '_blank',
    ),
  );

  // Use the description as the link text if available.
  if (empty($file->description)) {
    $link_text = $file->filename;
  }
  else {
    $link_text = $file->description;
    $options['attributes']['title'] = check_plain($file->filename);
  }

  return '<span class="file">' . $icon . ' ' . l($link_text, $url, $options) . '</span>';
}

function osbee_views_view_grouping($vars) {
  $view = $vars['view'];
  $view_id = $view->vid ;

  //do this only to view Profiles
  if ($view->name == 'profiles') {
    $title = $vars['title'];
    $content = str_replace('<h3>' . $title . '</h3>', '', $vars['content']);
    $group_id = strtolower(str_replace(' ', '-', str_replace(' &amp; ', '-', $title)));

    if ($view->is_attachment) {
      $view_type .= 'attachment';
    }
    else {
      $view_type .= 'block';
    }


    if ($view_type == 'attachment') {
      $output = '<div class="view-group view-group--' . $view_type . '" id="view-group--' . $group_id . '">';
      $output .= '<div class="view-group__content view-group__content' .
               '--' . $group_id  . '">' . $content . '</div>' ;
    }
    else {
      $output = '<div class="view-group view-group--' . $view_type . ' view-group--anchor--' . $group_id . '">';
      $output .= '<a class="view-group__title" href="#view-group' .
               '--' . $group_id  . '">' . $title . '</a>';
      $output .= '<div class="view-group__content">' . $content . '</div>' ;
    }

    $output .= '</div><!--/.view-group-->';

    return $output;
  }
}

function osbee_preprocess_page(&$vars) {
  global $_domain;
  $vars['domain_name'] = check_plain($_domain['sitename']);
}

function osbee_process_block(&$vars) {
  $block = $vars['block'];
  if (!empty($block->title_link)) {
    $vars['title'] = $block->subject;
  }
}

function osbee_form_custom_search_blocks_form_alter(&$form, &$form_state, $form_id) {
  $form['#submit'][] = 'osbee_custom_search_block_form_submit';
}
function osbee_form_search_block_form_alter(&$form, &$form_state, $form_id) {
  $form['#submit'][] = 'osbee_search_block_form_submit';
}

function osbee_search_block_form_submit($form, &$form_state) {
  $domain = domain_get_domain();
  if ($domain['machine_name'] !== 'osbee_com') {
    $form_state['redirect'] = 'http://osbee.com/search/node/' . $form_state['values']['search_block_form'];
  }
}

function osbee_custom_search_block_form_submit($form, &$form_state) {
  $form_state['redirect'] = str_replace('http://blog.', 'http://', $form_state['redirect']);
}