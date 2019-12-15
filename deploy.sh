npm run build
scp -i "id_rsa.pem" -r build "ubuntu@ec2-52-15-183-181.us-east-2.compute.amazonaws.com:"
ssh -i "id_rsa.pem" ubuntu@ec2-52-15-183-181.us-east-2.compute.amazonaws.com "sudo rm -rf /var/www/html/volunteer/*"
ssh -i "id_rsa.pem" ubuntu@ec2-52-15-183-181.us-east-2.compute.amazonaws.com "sudo mv build/* /var/www/html/volunteer"
echo 'Done!'