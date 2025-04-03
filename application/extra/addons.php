<?php

return [
    'autoload' => false,
    'hooks' => [
        'upgrade' => [
            'wwh',
        ],
    ],
    'route' => [
        '/$' => 'wwh/index/index',
        '/search/$' => 'wwh/index/search',
        '/[:diyname]$' => 'wwh/index/column',
        '/[:diyname]/[:id]$' => 'wwh/index/archives',
    ],
    'priority' => [],
    'domain' => '',
];
