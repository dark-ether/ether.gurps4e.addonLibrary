#!bin/bash
f(){
    echo webpack build -o "./library/public/"$(echo $1 | sed "s:$basedir$2::") --entry $1
}

callFunctionOnDir(){
    local dir=$1
    directory=$(ls $dir)
    for target in $directory
    do
        if [ -d $dir$target/ ]
        then
            callFunctionOnDir $dir$target/
        else
            f $dir$target/ $target/
        fi
    done
}

basedir="./library/javascript/macros/"

callFunctionOnDir $basedir
