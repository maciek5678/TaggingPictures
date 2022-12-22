<?php

namespace App;

class Files
{
	
	public static function searchFiles() {
		$filesDest= [];
		$dir = 'img';
		$imagesExtensions = array('jpg', 'jpeg', 'gif', 'png');
		$files = scandir($dir);
		foreach($files AS $file) {
			$files = [];
			$name = str_replace('.jpg', '', basename($file));
			$fileinfo = pathinfo($file);
			if(is_file($dir.'/'.$file) && in_array($fileinfo['extension'], $imagesExtensions)) {
				array_push($filesDest, $dir.'/'.$file);
			}
		}
		return $filesDest;
	}
}
	