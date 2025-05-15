# Install VPA 

- Resize CPU and Memory Resources assigned to Containers beta (enabled by default)

## Install CRDs and RBAC

```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.3/vertical-pod-autoscaler/deploy/vpa-v1-crd-gen.yaml
   ```

```bash
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/vpa-release-1.3/vertical-pod-autoscaler/deploy/vpa-rbac.yaml

   ```

## Install VPA VPA Components

```bash
    git clone https://github.com/kubernetes/autoscaler.git

   ```
```bash
    cd autoscaler

   ```
```bash
    ./vertical-pod-autoscaler/hack/vpa-up.sh

   ```

### Clean UP

```bash
    ./vertical-pod-autoscaler/hack/vpa-down.sh

   ```
