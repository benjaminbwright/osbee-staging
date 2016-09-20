<ul class="facebook-feed">
<?php foreach ($items as $item): ?>
  <li class="item">
    <span class="facebook-feed-picture"><img alt="<?php echo $item->from->name; ?>" src="<?php print (!empty($item->picture)) ? $item->picture : 'http://graph.facebook.com/' . $item->from->id . '/picture' ?>" /></span>
    <span class="facebook-feed-from"><a target="_blank" href="http://facebook.com/profile.php?id=<?php echo $item->from->id; ?>"><?php echo $item->from->name; ?></a></span>
    <span class="facebook-feed-message">
      <?php if(isset($item->message)) echo $item->message; ?>
      <?php if(isset($item->story)) echo $item->story; ?>
      <?php if ($item->type === 'link'): ?>
        <?php if(isset($item->description)) echo $item->description; ?>
        <?php echo l($item->name, $item->link, array('attributes' => array('target'=>'_blank'))); ?>
      <?php endif; ?>
    </span>
    <span class="facebook-feed-time"><?php echo t('!time ago.', array('!time' => format_interval(time() - strtotime($item->created_time)))); ?></span>
  </li>
<?php endforeach; ?>
</ul>
