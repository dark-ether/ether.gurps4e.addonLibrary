#!bin/bash
f(){
    npx webpack build --mode production -o "./library/public/javascript/$(echo $1 | sed -e "s:$basedir::" | sed -e "s:$2::" )" --output-filename $2 --entry $1
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
            f $dir$target $target
        fi
    done
}

basedir="./library/javascript/macros/"

callFunctionOnDir $basedir
