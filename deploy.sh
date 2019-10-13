npm run build
scp -i "id_rsa.pem" -r build "ubuntu@ec2-18-189-178-202.us-east-2.compute.amazonaws.com:"
ssh -i "id_rsa.pem" ubuntu@ec2-18-189-178-202.us-east-2.compute.amazonaws.com "sudo rm -rf /var/www/html/*"
ssh -i "id_rsa.pem" ubuntu@ec2-18-189-178-202.us-east-2.compute.amazonaws.com "sudo mv build/* /var/www/html"
echo 'Done!'