# noise-diffusion-model

Model to denoise images

Original image: ![image](https://user-images.githubusercontent.com/106636721/194939384-a6c5edbf-7326-4f33-8953-fe2b814457cf.png)

Noisy image: ![image](https://user-images.githubusercontent.com/106636721/194939310-ba70520a-ae5a-41c1-b4e6-cf81a72f3d2e.png)

Generated image: ![image](https://user-images.githubusercontent.com/106636721/194939347-c105bc2f-8e71-4264-bb8e-ce001e52d7a9.png)

The algorithm creates a set of noisy versions of the original image with weights

$$ w_{nk} I^*_{nk} = I_k $$

where $I_{nk}^*$ is the k pixel RGB value of the image n, $w_{nk}$ is it's weight and $I_k$ is the k pixel of the original image.
Then it creates a set of weights which is the average of the weights for every image

$$ W_k = {1 \over N} \left( \sum_{n} w_{nk} \right) = {1 \over N} \left( \sum_{n} {I_k \over I^*_{nk}} \right) $$

Then it creates a noisy image to use as input to generate the denoised one

$$ I_k^* = W_k I_{0k}^*    $$
