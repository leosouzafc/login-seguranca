#!/bin/bash

echo "Iniciando o frontend..."
cd ./frontend || exit
npm run dev &

echo "Iniciando o backend..."
pwd
cd ../backend || exit
source ~/miniconda3/bin/activate
conda activate login-seguranca
fastapi run --reload &

wait