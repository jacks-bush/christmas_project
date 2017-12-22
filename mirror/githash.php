<?php>
 echo json_encode(array('githash' => trim(`get rev-parse HEAD`)));
?>