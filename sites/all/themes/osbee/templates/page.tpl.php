<?php if ($page['help'] || ($show_messages && $messages)): ?>
  <div id='console'><div class='limiter clearfix'>
    <?php print render($page['help']); ?>
    <?php if ($show_messages && $messages): print $messages; endif; ?>
  </div></div>
<?php endif; ?>

<?php if ($page['header']): ?>
  <div id='header'><div class='limiter clearfix'>
    <?php print render($page['header']); ?>
  </div></div>
<?php endif; ?>

<?php if ($page['navigation']): ?>
  <div id='navigation'><div class='limiter clearfix'>
    <?php print render($page['navigation']); ?>
  </div></div>
<?php endif; ?>

<div id='page'><div class='limiter clearfix'>
  <div id="left-strip">
    <div id='branding'>
      <?php if ($site_name): ?><h1 class='site-name'><?php print $site_name ?></h1><?php endif; ?>
    </div>
    <?php if ($page['sidebar_first']): ?>
      <div id='left' class='clearfix'><?php print render($page['sidebar_first']) ?></div>
    <?php endif; ?>
  </div>

  <div id='main-content' class='clearfix contextual-links-region'>
    <?php if ($page['highlighted']): ?>
      <div id='highlighted'>
        <?php print render($page['highlighted']); ?>
      </div>
    <?php endif; ?>

    <?php //if ($breadcrumb) print $breadcrumb; ?>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?><h1 class='page-title'><?php print decode_entities($title) ?></h1><?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if ($is_admin || $user->uid): ?>
      <?php if ($tabs): ?><div class="tabs"><?php print render($tabs); ?></div><?php endif; ?>
      <?php if ($action_links): ?><ul class='links action-links clearfix'><?php print render($action_links); ?></ul><?php endif; ?>
    <?php endif; ?>
    <?php if (! $is_front || ($domain_name !== 'Osbee') ): ?>
      <div id='content' class='clearfix'>
        <?php print render($page['content']) ?>
        <?php if ($page['postscript']): ?>
          <div id='postscript' class='clearfix'><?php print render($page['postscript']) ?></div>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <?php if ($page['sidebar_second']): ?>
      <div id='right' class='clearfix'><?php print render($page['sidebar_second']) ?></div>
    <?php endif; ?>
  </div>

</div></div>

<div id="footer"><div class='limiter clearfix'>
  <?php print render($page['footer']) ?>
</div></div>

<!-- debug: test -->
