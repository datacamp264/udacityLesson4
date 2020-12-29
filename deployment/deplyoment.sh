kubectl apply -f udagram-api-auth-deployment.yaml
kubectl autoscale deployment udagram-api-auth --cpu-percent=50 --min=1 --max=2
kubectl apply -f udagram-api-auth-service.yaml
kubectl apply -f udagram-api-feed-deployment.yaml
kubectl apply -f udagram-api-feed-service.yaml
kubectl apply -f udagram-frontend-deployment.yaml
kubectl apply -f udagram-frontend-service.yaml
kubectl apply -f udagram-reverseproxy-deployment.yaml
kubectl apply -f udagram-reverseproxy-service.yaml