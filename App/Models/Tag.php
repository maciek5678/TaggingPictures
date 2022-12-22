<?php


namespace App\Models;

use PDO;
use \Core\View;
use \Core\Model;

class Tag extends Model
{	 
	 public function selectTags($src)
    {
			$db = static::getDB();
			$query1=$db->prepare("SELECT tags_details FROM tags WHERE image_name=:src" );	
			$query1->bindValue(':src', $src, PDO::PARAM_STR);
			$query1->execute();
			$row = $query1->fetch(PDO::FETCH_LAZY);
			if(isset($row->tags_details)){
				return $row->tags_details;
			}
	}
	public function addTags($src, $str)
	{
			$db = static::getDB();
			$query1=$db->prepare("SELECT tags_details FROM tags WHERE image_name=:src");	
			$query1->bindValue(':src', $src, PDO::PARAM_STR);
			$query1->execute();
			if($row = $query1->fetch(PDO::FETCH_ASSOC))
			{
				$query2=$db->prepare("UPDATE tags SET  tags_details=:str WHERE image_name=:src");	
				$query2->bindValue(':str', $str, PDO::PARAM_STR);
				$query2->bindValue(':src', $src, PDO::PARAM_STR);		
				$query2->execute();
			} else{
				$query3=$db->prepare("INSERT INTO tags VALUES (:src, :str)");	
				$query3->bindValue(':str', $str, PDO::PARAM_STR);
				$query3->bindValue(':src', $src, PDO::PARAM_STR);
				$query3->execute();
			}
	}
	public function updateTags($src, $str)
	{
			$db = static::getDB();
			$query2=$db->prepare("UPDATE tags SET  tags_details=:str WHERE image_name=:src");	
			$query2->bindValue(':str', $str, PDO::PARAM_STR);
			$query2->bindValue(':src', $src, PDO::PARAM_STR);		
			$query2->execute();	
	}
}