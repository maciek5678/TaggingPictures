<?php

namespace App;

/**
 * Application configuration
 *
 * PHP version 5.4
 */
class Config
{

    /**
     * Database host
     * @var string
     */
    const DB_HOST = 'localhost';

    /**
     * Database name
     * @var string
     */
    const DB_NAME = 'test';

    /**
     * Database user
     * @var string
     */
    const DB_USER = 'postgres';

    /**
     * Database password
     * @var string
     */
    const DB_PASSWORD = 'haslo';

    /**
     * Show or hide error messages on screen
     * @var boolean
     */
    const SHOW_ERRORS = true;
}
