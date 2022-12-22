<?php

namespace App\Controllers;

use \App\Models\Tag;
use \Core\View;
use \App\Files;

/**
 * Home controller
 *
 * PHP version 5.4
 */
class Home extends \Core\Controller
{

    public function indexAction()
    {	
		if (isset($_POST['picture'])){
			$picture=$_POST['picture'];
		} else {
			$picture="img/summer.jpg";
		}

			$filesDest = Files::searchFiles();

			View::renderTemplate('Home/index.html',[
			'filesDest' => $filesDest,
			'image' => $picture
			
			]);
	}
	
	public function tagSelectAction()
	{
		$src =  $_POST['name'];
		$tag = new Tag();
		echo $tag->selectTags($src);
		
	}
	
		public function tagAddAction()
	{
		$tag = new Tag();
		$src =  $_POST['name'];
		$str =  $_POST['points'];
		echo $tag->addTags($_POST['name'], $_POST['points']);
		
	}
	
			public function tagUpdateAction()
	{
		$tag = new Tag();
		$src =  $_POST['name'];
		$str =  $_POST['points'];
		echo $tag->addTags($_POST['name'], $_POST['points']);
		
	}
	
	
	
}
