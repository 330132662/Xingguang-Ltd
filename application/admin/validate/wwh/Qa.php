<?php

namespace app\admin\validate\wwh;

use think\Validate;

class Qa extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'sn' => 'unique:wwh_qa',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'sn.unique' => '序列号已存在',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['sn'],
        'edit' => ['sn' => 'unique:wwh_qa,sn^id'],
    ];
    
}
