#pragma version(1)
#pragma rs java_package_name(com.konylabs.rs)

rs_allocation pixelAlloc;
rs_allocation indices;
uint width;
uint height;
int radius;

void root(const uint *v_in, uchar4 *v_out) {
    uint x = *v_in >> 16 & 0xffff;
    uint y = *v_in & 0xffff;
    uint sumR = 0;
    uint sumG = 0;
    uint sumB = 0;
    uint sumA = 0;
    int yr = 0;
    int xr = 0;
    for(yr = -radius; yr <= radius; yr++){
        for(xr = -radius; xr <= radius; xr++){
            int a = x + xr;
            int b = y + yr;
            if(a < 0 || b < 0 || a >= width || b >= height)
                continue;
            uchar4 p = rsGetElementAt_uchar4(pixelAlloc, a, b);
            sumR = sumR + p.r;
            sumG = sumG + p.g;
            sumB = sumB + p.b;
            sumA = sumA + p.a;
        }
    }
    uint divisor = ((radius * 2) + 1) * ((radius * 2) + 1);
    float R = sumR / divisor;
    float G = sumG / divisor;
    float B = sumB / divisor;
    float A = sumA / divisor;

    if(R > 255)
        R = 255;
    if(R < 0)
        R = 0;
    if(G > 255)
        G = 255;
    if(G < 0)
        G = 0;
    if(B > 255)
        B = 255;
    if(B < 0)
        B = 0;
    R = R/255;
    G = G/255;
    B = B/255;
    A = A/255;
    //float R = rsGetElementAt_uchar4(pixelAlloc, x, y).r / 255;
    //float G = rsGetElementAt_uchar4(pixelAlloc, x, y).g / 255;
    //float B = rsGetElementAt_uchar4(pixelAlloc, x, y).b / 255;
    //float A = rsGetElementAt_uchar4(pixelAlloc, x, y).a / 255;
    *v_out = rsPackColorTo8888(R,G,B,A);
    //rsDebug("Karthik: ", *v_out);
}